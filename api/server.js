// libraries
const express = require("express");
const helmet = require('helmet');
const cors = require('cors');
const admin = require('firebase-admin')
// firebase
const serviceAccount = require('../mentor/service.json')
// server
const server = express();
// routers
const authRouter = require('../auth/auth-router')
const usersRouter = require("../resources/users/users-router");
const questionsRouter = require('../resources/questions/questions-router')
const answersRouter = require('../resources/answers/answers-router')

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/auth', authRouter);
server.use("/users", usersRouter);
server.use("/questions", questionsRouter);
server.use("/answers", answersRouter);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mentor-mee.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

server.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = server;
