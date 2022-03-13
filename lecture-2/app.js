const express = require("express");
const app = express();

const mongoose = require("mongoose");
const blogPostsRouter = require("./routes/blogposts");
const categoryRouter = require("./routes/categoryRoutes");

app.use(express.json());
console.log('s')

mongoose
    .connect("mongodb://localhost/ws-gen-12", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("Successfully connected to the database... ✔✔✔"))
    .catch((err) => console.log(err));

app.use("/blogposts", blogPostsRouter);
app.use("/category", categoryRouter);

app.listen(3000, () => {
    console.log("App is started on port 3000...");
});
