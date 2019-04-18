const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("./secret").jwtSecret;
const Users = require("../resources/users/users-model.js");

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
      res.status(500).json({ message: "error registering", error: error });
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
          userId: user.id,
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

router.get("/decode", async (req, res) => {
  try {
    const token = await req.headers.authorization;
    if (token) {
      await jwt.verify(token, secret, (error, decodedToken) => {
        if (error) {
          res.status(401).json({ message: "uh oh something went wrong" });
        } else {
          res.status(200).json(decodedToken);
        }
      });
    } else {
      res.status(401).json({ message: "error no token provided" });
    }
  } catch (error) {
    res.status(500).json({ message: "error getting info" });
  }
});

// STEP 2 - token generator function
function generateToken(user) {
  const payload = {
    subject: user.id,
    handle: user.handle
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;

// Idea for password update

// async function updatePass(req, res) {
//   const userID = req.decoded.subject;
//   console.log(`userID: `, userID);
//   const { password } = req.body;
//   console.log(`password: `, password);

//   try {
//     // const currentUser = await Users.getById(userID);
//     console.log("hello");
//     hashedPassword = bcrypt.hashSync(password, 10);
//     console.log("hello again");
//     password = hashedPassword;
//     console.log(`hashed pw: `, password);

//     await Users.updatePassword(userID, password);
//     res.status(200).json({
//       message: "Password was successfully updated"
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "An error occurred while updating the password.",
//       error
//     });
//   }
// }
