const jwt = require("jsonwebtoken");
const Register = require("../models/Register");
require("dotenv").config();
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verifyuser = jwt.verify(token, process.env.SECRET_KEY);
    const user = Register.findOne({ _id: verifyuser._id });
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
  module.exports = auth;
};
