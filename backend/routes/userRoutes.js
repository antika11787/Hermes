const express = require("express");
const routes = express();
const UserController = require("../controllers/userController");
const { isUserLoggedIn } = require("../middleware/authMiddleware");

const upload = require("../config/imageUpload");

routes.get("/all", isUserLoggedIn, UserController.allUsers);
routes.post(
  "/upload/:userId",
  upload.single("image"),
  UserController.imageUpload
);
routes.get("/profile", isUserLoggedIn, UserController.profile);
routes.get("/profile-pic", isUserLoggedIn, UserController.getProfilePic);

module.exports = routes;
