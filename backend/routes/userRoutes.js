const express = require("express");
const routes = express();
const UserController = require("../controllers/userController");
const { isUserLoggedIn } = require("../middleware/authMiddleware");

routes.get("/all", isUserLoggedIn, UserController.allUsers);

module.exports = routes;
