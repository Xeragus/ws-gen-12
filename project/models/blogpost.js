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
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
<<<<<<< HEAD
    required: [true, 'BlogPost must have an author']
=======
    required: ['[custom_message] User is a required field']
  },
  city: {
    type: mongoose.Types.ObjectId,
    ref: 'City',
    required: ['City is required field']
>>>>>>> f14f8d9b67634eb4168d3cf86c3ac176bb0f3607
  }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);