const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  full_name: {
    type: String,
    required: ['Full name is a required field']
  },
  email: {
    type: String
  }
});

module.exports = mongoose.model('User', userSchema);