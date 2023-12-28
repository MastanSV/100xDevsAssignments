const { User } = require("../db/index");

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const { username, password } = req.headers;

  User.find({ username: username, password: password }).then((resp) => {
    if (resp.length > 0) {
      next();
    } else {
      res.status(404).json({ message: "invalid user." });
    }
  });
}

module.exports = userMiddleware;
