const { Admin } = require("../db/index");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const { username, password } = req.headers;

  Admin.find({ username: username, password: password }).then((resp) => {
    if (resp.length > 0) {
      next();
    } else {
      res.status(404).json({ message: "Invalid Admin." });
    }
  });
}

module.exports = adminMiddleware;
