const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
  title: {
    type: String,
    required: ['Title is a required field']
  },
  content: {
    type: String
  }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);