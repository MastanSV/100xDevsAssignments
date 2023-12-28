const { Admin } = require("../db/index");
const jwtPassword = "SecretToken@23#Mastan";
const jwt = require("jsonwebtoken");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const { authorization } = req.headers;
  try {
    const verificationResponse = jwt.verify(authorization, jwtPassword);

    if (verificationResponse) {
      next();
    } else {
      res.status(401).json({ message: "unauthorized access" });
    }
  } catch (exception) {
    console.log(`Error occured : ${exception}`);
    res.status(401).json({ message: "unauthorized access" });
  }
}

module.exports = adminMiddleware;
