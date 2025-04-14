const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function jwtGenerator(user_id, role) {
  const payload = {
    userId: user_id,
    role: role,
  };

  //access token
  let token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  token = `Bearer ${token}`;
  return { token };
}
module.exports = jwtGenerator;
