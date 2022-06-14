let mongoose = require("mongoose");

let fileSchema = new mongoose.Schema({
  uploadFile: String,
});
let FileModal = mongoose.model("FileModal", fileSchema);
module.exports = FileModal;
