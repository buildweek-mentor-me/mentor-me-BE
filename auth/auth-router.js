const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require('../api/secret.js').jwtSecret;
const Users = require("../users/users-model.js");

// for endpoints beginning with /auth
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.insert(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { handle, password } = req.body;

  Users.findBy({ handle })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // define token
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.handle}!`,
          token // give token as response
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// STEP 2 - token generator function
function generateToken(user) {
  const payload = {
    subject: user.id,
    handle: user.handle,
    // roles: ['student', 'ta']
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
