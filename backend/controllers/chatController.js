const chatModel = require("../models/chatModel");
const { success, failure } = require("../utils/successError");
const userModel = require("../models/userModel");
const messageModel = require("../models/messageModel");
const mongoose = require("mongoose");

class ChatController {
  async accessChats(req, res) {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).send(failure("User not found"));
      }

      const participants = [
        new mongoose.Types.ObjectId(req.user.userID),
        new mongoose.Types.ObjectId(userId),
      ];

      const existingChat = await chatModel
        .findOne({
          users: {
            $all: participants,
          },
          isGroupChat: false,
        })
        .populate({
          path: "latestMessage",
          populate: {
            path: "sender",
            select: "username email imageUrl",
          },
        });

      if (existingChat) {
        console.log("found chat", existingChat);
        return res.status(200).send(success("Chat found", existingChat));
      }

      const sender = await userModel.findById(userId);

      const newChat = await chatModel.create({
        chatName: sender.username,
        users: participants,
      });

      const fullChat = await chatModel.findById(newChat._id);

      return res.status(200).send(success("Chat created", fullChat));
    } catch (error) {
      console.error("Error has occurred", error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }

  async fetchChats(req, res) {
    try {
      const chats = await chatModel
        .find({
          users: {
            $elemMatch: {
              $eq: req.user.userID,
            },
          },
        })
        .populate("users", "username email imageUrl")
        .populate("latestMessage")
        .populate({
          path: "groupAdmin",
          select: "username email imageUrl",
        })
        .sort({ updatedAt: -1 });

      if (!chats || chats.length === 0) {
        return res.status(400).send(failure("Chats not found", chats));
      }
      return res.status(200).send(success("Chats found", chats));
    } catch (error) {
      console.error("Error has occurred", error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }

  async createGroupChat(req, res) {
    try {
      const { chatName, users } = req.body;

      if (!chatName) {
        chatName = "Group Chat";
      }

      if (!users) {
        return res.status(400).send(failure("Please select at least 1 user"));
      }

      const existingChatName = await chatModel.findOne({ chatName });
      if (existingChatName) {
        return res.status(400).send(failure("Chat name already exists"));
      }

      let allUsers = [];

      users.forEach((user) => {
        allUsers.push(new mongoose.Types.ObjectId(user));
      });

      allUsers.push(new mongoose.Types.ObjectId(req.user.userID));

      const groupChat = await chatModel.create({
        chatName,
        isGroupChat: true,
        groupAdmin: req.user.userID,
        users: allUsers,
      });

      if (!groupChat) {
        return res.status(400).send(failure("Group chat not created"));
      }

      return res.status(200).send(success("Group chat created", groupChat));
    } catch (error) {
      console.error("Error has occurred", error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }

  async addUsersToGroupChat(req, res) {
    try {
      const { chatId, userId } = req.body;

      if (!chatId) {
        return res.status(400).send(failure("Chat not found"));
      }
      if (!userId || userId.length === 0) {
        return res.status(400).send(failure("Please select at least 1 user"));
      }

      const group = await chatModel.findById(chatId);
      if (!group.isGroupChat) {
        return res.status(400).send(failure("Chat is not a group chat"));
      }

      if (group.isGroupChat) {
        if (group.groupAdmin.toString() !== req.user.userID) {
          return res
            .status(400)
            .send(failure("Only group admin can add users"));
        }
      }

      if (group.users.includes(userId)) {
        return res.status(400).send(failure("User already in the group"));
      }

      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(400).send(failure("User not found"));
      }

      group.users.push(new mongoose.Types.ObjectId(userId));
      await group.save();

      return res.status(200).send(success("User added to group", group));
    } catch (error) {
      console.error("Error has occurred", error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }

  async removeUserFromGroupChat(req, res) {
    try {
      const { chatId, userId } = req.body;

      if (!chatId) {
        return res.status(400).send(failure("Chat not found"));
      }

      const group = await chatModel.findById(chatId);

      if (!group) {
        return res.status(400).send(failure("Chat not found"));
      }

      if (!group.isGroupChat) {
        return res.status(400).send(failure("Chat is not a group chat"));
      }

      if (!userId || userId.length === 0) {
        return res.status(400).send(failure("Please select at least 1 user"));
      }

      if (!group.users.includes(userId)) {
        return res.status(400).send(failure("User is not in the group"));
      }

      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(400).send(failure("User not found"));
      }

      // condition - if user wants to LEAVE
      if (userId === req.user.userID) {
        // if a logged in non-admin user wants to leave group
        const index = group.users.indexOf(userId);

        group.users.splice(index, 1);
        await group.save();

        // if admin wants to leave group
        if (group.groupAdmin.toString() === userId && group.users.length > 0) {
          group.groupAdmin = group.users[0];
          await group.save();
        }

        if (group.users.length === 0) {
          const deleteChat = await chatModel.findByIdAndDelete(chatId);

          await messageModel.deleteMany({ chat: deleteChat._id });
        }

        return res.status(200).send(success("You left the group", group));
      }

      // user is not admin but wants to REMOVE a user from the group
      if (
        userId !== req.user.userID &&
        group.groupAdmin.toString() !== req.user.userID
      ) {
        return res
          .status(400)
          .send(failure("Only group admin can remove users"));
      }

      // condition - if admin REMOVES a user from group
      group.users = group.users.filter((user) => user.toString() !== userId);
      await group.save();

      return res.status(200).send(success("User removed from group", group));
    } catch (error) {
      console.error("Error has occurred", error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }

  async changeAdmin(req, res) {
    try {
      const { chatId, userId } = req.body;

      if (!chatId) {
        return res.status(400).send(failure("Chat not found"));
      }
      if (!userId) {
        return res.status(400).send(failure("Please select at least 1 user"));
      }

      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(400).send(failure("User not found"));
      }

      const group = await chatModel.findById(chatId);
      if (!group) {
        return res.status(400).send(failure("Chat not found"));
      }

      if (req.user.userID !== group.groupAdmin.toString()) {
        return res
          .status(400)
          .send(failure("Only group admin can change admin"));
      }

      if (!group.users.includes(userId)) {
        return res.status(400).send(failure("User is not in the group"));
      }

      group.groupAdmin = userId;
      await group.save();

      return res.status(200).send(success("Admin changed", group));
    } catch (error) {
      console.error("Error has occurred", error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }

  async renameGroupChat(req, res) {
    try {
      const { chatId, chatName } = req.body;

      if (!chatId) {
        return res.status(400).send(failure("Chat not found"));
      }

      const group = await chatModel.findById(chatId);
      if (!group) {
        return res.status(400).send(failure("Chat not found"));
      }

      if (!group.isGroupChat) {
        return res.status(400).send(failure("Chat is not a group chat"));
      }

      if (chatName) {
        group.chatName = chatName;
        await group.save();
      }
  
      return res.status(200).send(success("Group name changed", group));
    } catch (error) {
      console.error("Error has occurred", error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }
}

module.exports = new ChatController();
