const { handleJSONTokenError } = require("../utils/errorHandler");
const { failure } = require("../utils/successError");

const isUserLoggedIn = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(400).send(failure("Authorization failed!"));
    }
    const token = req.headers.authorization?.split(" ")[1] ?? "";

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).send(failure("Authorization failed!"));
    }

    const customRequest = req;
    customRequest.user = decoded;
    next();
  } catch (error) {
    console.log("error found", error);
    handleJSONTokenError(error, req, res, next);
    return res.status(500).send(failure("Internal server error"));
  }
};

module.exports = { isUserLoggedIn };
