const userModel = require("../models/userModel");
const { success, failure } = require("../utils/successError");

class UserController {
  //   async createValidation(req, res, next) {
  //     try {
  //       const validation = validationResult(req).array();
  //       if (validation.length > 0) {
  //         return res
  //           .status(400)
  //           .send({ message: "Validation error", validation });
  //       }
  //       next();
  //     } catch (error) {
  //       console.log("Error has occurred", error);
  //       return res.status(500).send(failure("Internal server error", error));
  //     }
  //   }

  async allUsers(req, res) {
    try {
      const keyword = req.query.search
        ? {
            $or: [
              { name: { $regex: new RegExp(req.query.search, "i") } },
              { email: { $regex: new RegExp(req.query.search, "i") } },
            ],
          }
        : {};
      const users = await userModel.find({
        ...keyword,
        _id: { $ne: req.user._id },
      });

      if (!users || users.length === 0) {
        return res.status(404).send(failure("Users not found"));
      }

      const responseUser = users.map((user) => {
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      });

      return res
        .status(200)
        .send(success("Users fetched successfully", responseUser));
    } catch (error) {
      console.log("Error has occurred", error);
      return res.status(500).send(failure("Internal server error", error));
    }
  }
}

module.exports = new UserController();
