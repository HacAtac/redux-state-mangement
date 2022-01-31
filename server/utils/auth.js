const jwt = require("jsonwebtoken");

const secret = "mysecretssshhhhhhh";
const expiration = "2h";

module.exports = {
  signToken: function ({ email, lastName, _id }) {
    const payload = { email, lastName, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
