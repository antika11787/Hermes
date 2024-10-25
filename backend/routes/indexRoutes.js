const express = require("express");
const dotenv = require("dotenv");

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const chatRoutes = require("./chatRoutes");

dotenv.config();

const app = express();

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/chat", chatRoutes);

module.exports = app;