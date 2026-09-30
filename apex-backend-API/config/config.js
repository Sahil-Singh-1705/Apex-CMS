const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET_KEY,
};
