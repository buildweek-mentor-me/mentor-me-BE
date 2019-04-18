const jwt = require("jsonwebtoken");
const secret = require("./secret.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secret.jwtSecret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: "Invalid Creds" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};
