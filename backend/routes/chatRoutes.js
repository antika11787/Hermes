const express = require("express");
const routes = express();
const { isUserLoggedIn } = require("../middleware/authMiddleware");
const ChatController = require("../controllers/chatController");

routes.post("/access", isUserLoggedIn, ChatController.accessChats);
routes.get("/fetch-chats", isUserLoggedIn, ChatController.fetchChats);
routes.post("/create-group", isUserLoggedIn, ChatController.createGroupChat);
routes.post(
  "/add-users-to-group",
  isUserLoggedIn,
  ChatController.addUsersToGroupChat
);
routes.delete(
  "/remove-user-from-group",
  isUserLoggedIn,
  ChatController.removeUserFromGroupChat
);
routes.patch("/change-admin", isUserLoggedIn, ChatController.changeAdmin);
routes.patch("/rename-group", isUserLoggedIn, ChatController.renameGroupChat);

module.exports = routes;
