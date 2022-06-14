let mongoose = require("mongoose");
let Student = new mongoose.Schema({
  name: String,
  email: "string",
  age: "Number",
  contact: "Number",
});
let StudentModal = mongoose.model("StudentModal", Student);
module.exports = StudentModal;
