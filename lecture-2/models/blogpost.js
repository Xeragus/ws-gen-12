const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
  title: {
    type: String,
    required: ['Title is a required field']
  },
  content: {
    type: String
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: ['[custom_message] Category is a required field']
  }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);