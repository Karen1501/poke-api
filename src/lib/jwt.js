const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function sign(payload = {}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "20d" });
}

function verify(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  ...jwt,
  sign,
  verify,
};
