const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  ism: { type: String, required: true },
  familya: { type: String, required: true },
  telefon: { type: String, required: true },
  rasm: { type: String }
});

module.exports = mongoose.model('User', userSchema);