const mongoose = require('mongoose');

const names = new mongoose.Schema({
    sname: { type: String },
    sroll:{type: Number ,  unique : true}
})
const Name = mongoose.model('names', names);

module.exports = Name;