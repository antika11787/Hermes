const mongoose = require("mongoose");

const connectDB = async (callback = () => {}) => {
  try {
    if (process.env.MONGODB_URI) {
      const client = await mongoose.connect(process.env.MONGODB_URI);
      if (client) {
        console.log("mongodb connected successfully");
        callback();
      } else {
        console.log("mongodb error: ", error);
      }
    }
  } catch (error) {
    console.log("mongodb error: ", error);
    process.exit();
  }
};

module.exports = connectDB;
