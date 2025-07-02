const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  ism: {
    type: String,
    required: true
  },
  familya: {
    type: String,
    required: true
  },
  telefon: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
