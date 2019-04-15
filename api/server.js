const express = require("express");
const server = express();
const usersRouter = require("../users/users-router");

server.use(express.json());
server.use("/users", usersRouter);

server.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = server;
