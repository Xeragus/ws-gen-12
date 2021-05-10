const express = require("express");
const app = express();
const jwt = require('express-jwt');
const errorResponse = require('../../lib/responses/error');
const upload = require('express-fileupload');
const router = require('./router');

app.use(express.json());

app.use(jwt({
  secret: 'nikola123',
  algorithms: ['HS256']
}));

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    errorResponse(res, 401, new Error('You need to log in to perform this action.'));
  }
});

app.use(upload());

app.use("/upload", router);

app.listen(3003, () => {
  console.log("Upload app is started on port 3003...");
});
