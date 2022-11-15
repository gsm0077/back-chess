const mongoose = require("mongoose");

const names = new mongoose.Schema({
  name: { type: String },
  dob:{type:String},
  email: { type: String , unique : true},
  phone: { type: Number },
  address: { type: String },
  gender: { type: String },
});
const Namestudent = mongoose.model("details", names);

module.exports = Namestudent;
