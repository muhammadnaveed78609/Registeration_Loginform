const mongoose = require("mongoose");
const validator = require("validator");
const registerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  middlename: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  course: String,
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  phone: Number,
  address: String,
  email: {
    type: String,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid mail");
      }
    },
  },
  password: String,
  re_typepass: String,
});

const RegisterData = new mongoose.model("Users", registerSchema);
module.exports = RegisterData;
