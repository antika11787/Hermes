const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { promisify } = require("util");
const ejs = require("ejs");
const ejsRenderFile = promisify(ejs.renderFile);

const authModel = require("../models/authModel");
const userModel = require("../models/userModel");
const { success, failure } = require("../utils/successError");
const { validationResult } = require("express-validator");

class AuthController {
  async createValidation(req, res, next) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return res
          .status(400)
          .send({ message: "Validation error", validation });
      }
      next();
    } catch (error) {
      console.log("Error has occurred", error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }

  async signup(req, res) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).send({ message: "All fields are required" });
      }

      const existingUser = await authModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userModel.create({
        username,
        email,
      });
      await user.save();

      const auth = new authModel({
        username,
        email,
        password: hashedPassword,
        userID: user._id,
      });
      await auth.save();

      const responseAuth = {
        ...auth.toObject(),
        password: undefined,
        __v: undefined,
      };

      return res
        .status(200)
        .send(success("User created successfully", responseAuth));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send({ message: "All fields are required" });
      }

      const user = await authModel.findOne({ email });
      if (!user) {
        return res.status(400).send({ message: "User does not exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: "Invalid credentials" });
      }

      const responseAuth = {
        ...user.toObject(),
        password: undefined,
        __v: undefined,
      };

      const generatedToken = jwt.sign(responseAuth, process.env.JWT_SECRET, {
        expiresIn: "20d",
      });

      responseAuth.token = generatedToken;

      return res.status(200).send(success("Login successful", responseAuth));
    } catch (error) {
      console.log(error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }
}

module.exports = new AuthController()
