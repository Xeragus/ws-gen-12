const express = require("express");
const app = express();
const mongoose = require("mongoose");
const blogPostsRouter = require("./routes/blogposts");
const categoriesRouter = require("./routes/categories");
const citiesRouter = require("./routes/cities");
const jwt = require('express-jwt');
const errorResponse = require('../../lib/responses/error');

require('dotenv').config();

app.use(express.json());

mongoose.connect("mongodb://localhost/ws-gen-12", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(jwt({
  secret: process.env.AUTH_SECRET_KEY,
  algorithms: ['HS256']
}).unless({
  path: [
    {
      url: '/blogposts', methods: ['GET']
    },
    {
      url: '/categories', methods: ['GET']
    },
    {
      url: '/cities', methods: ['GET']
    }
  ]
}));

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    errorResponse(res, 401, new Error('You need to log in to perform this action.'));
  }
});

app.use("/blogposts", blogPostsRouter);
app.use("/categories", categoriesRouter);
app.use("/cities", citiesRouter)

app.listen(process.env.BLOG_APP_PORT, () => {
  console.log(`Blog app is started on port ${process.env.BLOG_APP_PORT}...`);
});
