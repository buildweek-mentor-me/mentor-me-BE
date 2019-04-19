// libraries
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// for firebase
// const admin = require("firebase-admin");
// const serviceAccount = require("../mentor/service.json");

// server
const server = express();
// routers
const authRouter = require("../auth/auth-router");
const usersRouter = require("../resources/users/users-router");
const questionsRouter = require("../resources/questions/questions-router");
const answersRouter = require("../resources/answers/answers-router");

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/auth", authRouter);
server.use("/users", usersRouter);
server.use("/questions", questionsRouter);
server.use("/answers", answersRouter);

// for firebase
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://mentor-mee.firebaseio.com"
// });

server.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = server;
