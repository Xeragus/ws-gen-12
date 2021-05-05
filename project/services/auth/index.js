const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require('./router');

app.use(express.json());

mongoose.connect("mongodb://localhost/ws-gen-12", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use('/', router);

app.listen(3001, () => {
  console.log("Auth app is started on port 3001...");
});
