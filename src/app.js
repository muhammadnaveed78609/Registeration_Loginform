const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../db/conn");
const RegisterData = require("../models/Register");
const port = process.env.PORT || 8000;
// app.use(path.join(__dirname))
const templateptah = path.join(__dirname, "../public");
const partialpath = path.join(__dirname, "../partials");
const viewpath = path.join(__dirname, "../views");
// console.log(path.join(templateptah));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(templateptah));
app.set("view engine", "hbs");
app.set("views", viewpath);
hbs.registerPartials(partialpath);
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("index");
});
//create user regsiteration
app.post("/register", async (req, res) => {
  try {
    const Password = req.body.psw;
    const password_repeat = req.body.pswrepeat;
    if (Password == password_repeat) {
      const user = new RegisterData({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        course: req.body.option,
        gender: req.body.gender,
        phone: req.body.phone,
        address: req.body.Address,
        email: req.body.email,
        password: Password,
        re_typepass: password_repeat,
      });
      console.log("Parse data is  " + user);
      const token = await user.generateAuthToken();
      const data = await user.save();
      console.log(data);
      res.status(200).render("index");
    } else {
      res.send("Password Not Matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
app.post("/login", async (req, res) => {
  try {
    const uemail = req.body.email;
    const passworrd = req.body.password;
    const useremail = await RegisterData.findOne({ email: uemail });
    const isMatch = await bycrypt.compare(passworrd, useremail.password);
    const token = await user.generateAuthToken();
    if (isMatch) {
      res.status(200).send("Password Matched");
    } else {
      res.status(400).send("Password Not Matched");
    }
  } catch (error) {
    res.status(400).send("Invalid email");
    console.log(error);
  }
});
app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("Success");
});
