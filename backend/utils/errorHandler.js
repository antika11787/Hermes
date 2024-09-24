const handleSyntaxError = (err, req, res, next) => {
  if (err && "body" in err) {
    return res.status(400).send({ message: "Invalid JSON syntax!" });
  }
  next();
};

const handleJSONTokenError = (err, req, res, next) => {
  if (err) {
    return res.status(500).send({ message: "Token is invalid", error: err });
  }
  if (err) {
    return res.status(500).send({ message: "Token is expired", error: err });
  }
  next();
};

module.exports = { handleSyntaxError, handleJSONTokenError };
