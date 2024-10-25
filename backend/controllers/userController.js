const userModel = require("../models/userModel");
const authModel = require("../models/authModel");
const { success, failure } = require("../utils/successError");

class UserController {
  async imageUpload(req, res) {
    try {
      const userId = req.params.userId;

      if (!userId) {
        return res.status(400).send(failure("User ID is required"));
      }

      if (!req.file) {
        return res.status(400).send(failure("Image is required"));
      }

      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        {
          imageUrl: req.file.path,
          publicId: req.file.filename,
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).send(failure("User not found"));
      }

      res.status(200).json(
        success("Image uploaded successfully", {
          imageUrl: updatedUser.imageUrl,
          publicId: updatedUser.publicId,
        })
      );
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }

  async profile(req, res) {
    try {
      const user = await authModel
        .findById(req.user._id)
        .select("-password -__v -_id");

      if (!user) {
        return res.status(404).send(failure("User not found"));
      }

      return res.status(200).send(success("User fetched successfully", user));
    } catch (error) {
      console.log("Error has occurred", error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }

  async getProfilePic(req, res) {
    try {
      const profilePic = await userModel
        .findById(req.user.userID)
        .select("imageUrl -_id");

      if (!profilePic) {
        return res.status(404).send(failure("Profile pic not found"));
      }

      return res
        .status(200)
        .send(success("Profile pic fetched successfully", profilePic));
    } catch (error) {
      console.log("Error has occurred", error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }

  async allUsers(req, res) {
    try {
      const keyword = req.query.search
        ? {
            $or: [
              { name: { $regex: new RegExp(req.query.search, "i") } },
              { email: { $regex: new RegExp(req.query.search, "i") } },
            ],
          }
        : {};
      const users = await userModel.find({
        ...keyword,
        _id: { $ne: req.user._id },
      });

      if (!users || users.length === 0) {
        return res.status(404).send(failure("Users not found"));
      }

      const responseUser = users.map((user) => {
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      });

      return res
        .status(200)
        .send(success("Users fetched successfully", responseUser));
    } catch (error) {
      console.log("Error has occurred", error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }
}

module.exports = new UserController();
