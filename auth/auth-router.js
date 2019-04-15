const router = require("express").Router();
const bcrypt = require("bcryptjs");
// STEP 3 yarn add and rquire jsonwebtoken library
const jwt = require("jsonwebtoken");
const secret = require('../api/secret.js').jwtSecret;
const Users = require("../users/users-model.js");

// for endpoints beginning with /api/auth
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
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
        // STEP 1 - define token
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.handle}!`,
          token // STEP 4 - give token as response
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
  //STEP 7 - change secret to env
  //const secret = "keep it secret, keep it safe";
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
