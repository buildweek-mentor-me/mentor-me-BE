// libraries
const express = require("express");
const helmet = require('helmet');
const cors = require('cors');
// server
const server = express();
// routers
const usersRouter = require("../resources/users/users-router");
const authRouter = require('../auth/auth-router')

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/auth', authRouter);
server.use("/users", usersRouter);

server.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = server;
