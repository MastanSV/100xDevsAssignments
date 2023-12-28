const jwt = require("jsonwebtoken");
const zod = require("zod");
const jwtPassword = "secret";

const myUsernameSchema = zod.string().email();
const myPasswordSchema = zod.string().min(6);

/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */
function signJwt(username, password) {
  // Your code here
  let usernameValidationResponse = validateUserName(username);
  if (!usernameValidationResponse.success) {
    return null;
  }

  let passwordValidationResponse = validatePassword(password);
  if (!passwordValidationResponse.success) {
    return null;
  }

  let token = jwt.sign({ username: username }, jwtPassword);
  return token;
}

function validateUserName(username) {
  return myUsernameSchema.safeParse(username);
}

function validatePassword(password) {
  return myPasswordSchema.safeParse(password);
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
  // Your code here
  let decoded;
  try {
    decoded = jwt.verify(token, jwtPassword);
  } catch (exception) {
    console.log(`verification failed, ${exception}`);
  }
  return decoded ? true : false;
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
  // Your code here
  let decoded;
  try {
    decoded = jwt.decode(token, jwtPassword);
  } catch (exception) {
    console.log(`decode failed, error : ${exception}`);
  }

  return decoded ? true : false;
}

// let signedToken = signJwt("mastanvali157@gmail.com", "Mastan");

// if (signedToken) {
//   let result = verifyJwt(signedToken);

//   let decodedResponse = decodeJwt(signedToken);
// }

module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
