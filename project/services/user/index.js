const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./router");
const jwt = require("express-jwt");
const errorResponse = require("../../lib/responses/error");

app.use(express.json());

mongoose.connect("mongodb://localhost/ws-gen-12", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use(
    jwt({
        secret: "nikola123",
        algorithms: ["HS256"],
    })
);

app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        errorResponse(
            res,
            401,
            new Error("You need to log in to perform this action.")
        );
    }
});

app.use("/users", userRouter);

app.listen(3005, () => {
    console.log("User app is started on port 3005...");
});
