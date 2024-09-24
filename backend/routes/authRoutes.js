const express = require("express");
const routes = express();
const AuthController = require("../controllers/authController");
const authValidators = require("../middleware/validation");

routes.post(
  "/signup",
  authValidators.signup,
  AuthController.createValidation,
  AuthController.signup
);
routes.post("/login", AuthController.login);

module.exports = routes;
