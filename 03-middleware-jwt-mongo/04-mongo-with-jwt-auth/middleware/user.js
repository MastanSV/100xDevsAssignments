const { User } = require("../db/index");
const jwt = require("jsonwebtoken");
const jwtPassword = "UserPassword@23#verify.";

function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const { authorization: token } = req.headers;

  let verified;
  try {
    verified = jwt.verify(token, jwtPassword);
  } catch (exception) {
    console.log(`Error occured : ${exception}`);
    res.status(401).json({ message: "unauthorized access" });
  }

  if (verified) {
    next();
  } else {
    res.status(401).json({ message: "unauthorized access" });
  }
}

module.exports = userMiddleware;
