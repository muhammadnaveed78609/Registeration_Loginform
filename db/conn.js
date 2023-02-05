const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/Registration", (err) => {
  if (err) return console.log(err);
  console.log("Connection Established");
});
