const mongoose = require("mongoose");
const validator = require("validator");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
registerSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign(
      { _id: this._id },
      `mynameis${this.firstname}`
    );
    this.tokens = this.tokens.concat({ tokens: token }); //instead write only token
    await this.save();
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};
registerSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isModified("pswrepeat")) {
    console.log(`current pass is ${this.password}`);
    this.password = await bycrypt.hash(this.password, 10);
    this.re_typepass = await bycrypt.hash(this.re_typepass, 10);
    console.log(`After hashing is ${this.password}`);
  }
  next();
});
const RegisterData = new mongoose.model("Users", registerSchema);
module.exports = RegisterData;
