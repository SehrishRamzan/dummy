let mongoose = require("mongoose");
let user = new mongoose.Schema({
  name: String,
  email: String,
  password: Number,
});
let User = mongoose.model("UserModal", user);
module.exports = User;
