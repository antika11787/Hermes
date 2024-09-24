// const asyncHandler = require("express-async-handler");
// const userModel = require("../models/userModel");
// const generateToken = require("../config/generateToken");

// const registerUser = asyncHandler(async (req, res) => {
//   const { username, email, password } = req.body;
//   if (!username || !email || !password) {
//     res.status(400);
//     throw new Error("Please add all fields");
//   }

//   const userExists = await userModel.findOne({ email, username });
//   if (userExists) {
//     res.status(400);
//     throw new Error("User already exists");
//   }

//   const user = await userModel.create({
//     username,
//     email,
//     password,
//     // image
//   });
//   if (user) {
//     res.status(201).json({
//       _id: user.id,
//       username: user.username,
//       email: user.email,
//       // image: user.image,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Failed to create the user");
//   }
// });

// const authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const user = await userModel.findOne({ email });

//   if (user && (await user.matchPassword(password))) {
//     res.status(200).json({
//       _id: user.id,
//       email: user.email,
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid credentials");
//   }
// });

// module.exports = {
//   registerUser,
//   authUser,
// };
