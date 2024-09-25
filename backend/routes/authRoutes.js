const express = require("express");
const routes = express();
const AuthController = require("../controllers/authController");
const authValidators = require("../middleware/validation");

const upload = require('../config/imageUpload');
const cloudinary = require('../config/cloudinary');

routes.post(
  "/signup",
  authValidators.signup,
  AuthController.createValidation,
  AuthController.signup
);
routes.post("/login", AuthController.login);
routes.post('/upload', upload.single('image'), AuthController.imageUpload);

module.exports = routes;
