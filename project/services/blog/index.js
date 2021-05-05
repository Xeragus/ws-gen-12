const express = require("express");
const app = express();
const mongoose = require("mongoose");
const blogPostsRouter = require("./routes/blogposts");
const categoriesRouter = require("./routes/categories");

app.use(express.json());

mongoose.connect("mongodb://localhost/ws-gen-12", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use("/blogposts", blogPostsRouter);
app.use("/categories", categoriesRouter);

app.listen(3000, () => {
  console.log("Blog app is started on port 3000...");
});
