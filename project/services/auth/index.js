const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require('./router');
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
      url: '/auth/register', methods: ['POST']
    },
    {
      url: '/auth/login', methods: ['POST']
    }
  ]
}));

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    errorResponse(res, 401, new Error('You need to log in to perform this action.'));
  }
});

app.use('/auth', router);

app.listen(process.env.AUTH_APP_PORT, () => {
  console.log(`Auth app is started on port ${process.env.AUTH_APP_PORT}...`);
});
