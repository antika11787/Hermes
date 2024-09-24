const express = require("express");
const dotenv = require("dotenv");

const authRoutes = require("./authRoutes");
// const userRoutes = require("./userRoutes");

dotenv.config();

const app = express();

app.use("/auth", authRoutes);
// app.use("/user", userRoutes);

module.exports = app;