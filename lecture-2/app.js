const express = require('express');
const app = express();
const mongoose = require('mongoose');
const blogPostsRouter = require('./routes/blogposts');

app.use(express.json());

mongoose.connect('mongodb://localhost/ws-gen-12', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});

app.use('/blogposts', blogPostsRouter);

app.listen(3000, () => {
  console.log('App is started on port 3000...');
});
