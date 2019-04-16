// libraries
const express = require("express");
const helmet = require('helmet');
const cors = require('cors');
// server
const server = express();
// routers
const authRouter = require('../auth/auth-router')
const usersRouter = require("../resources/users/users-router");
const questionsRouter = require('../resources/questions/questions-router')

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/auth', authRouter);
server.use("/users", usersRouter);
server.use("/questions", questionsRouter);

server.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = server;
