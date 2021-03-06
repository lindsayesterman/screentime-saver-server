require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const usersRouter = require ("./users/users-router");
const scrtimesRouter = require("./scrtimes/scrtimes-router");
const friendsRouter = require("./friends/friends-router");
const authRouter = require("./auth/auth-router");
const jwtAuth = require("./middleware/jwt-auth.js");

const app = express();
const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use(jwtAuth);
app.use("/api/friends", friendsRouter);
app.use("/api/scrtimes", scrtimesRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    response = { message: error.message, error };
  }
  console.error(error);
  res.status(500).json(response);
});

module.exports = app;
