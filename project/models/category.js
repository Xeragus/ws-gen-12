const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: ['Name is a required field']
  },
});

module.exports = mongoose.model('Category', categorySchema);