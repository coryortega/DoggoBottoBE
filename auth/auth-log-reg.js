const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admins = require("../admin/admin-model");
const { validateUser } = require("../admin/admin-helpers");

// Register admin
router.post("/register", (req, res) => {
  let admin = req.body;

  const validateResult = validateUser(admin);
    console.log(admin)
  if (validateResult.isSuccessful === true) {
    
    const hash = bcrypt.hashSync(admin.password, 12);
    admin.password = hash;

    Admins.add(admin)
      .then(result => {
        res
          .status(201)
          .json(`${result.username} has been successfully created.`);
      })
      .catch(error => {
        res.status(500).json(`There was an error with registration: ${error}.`);
      });
  } else {
    res.status(400).json({
      messsage: "Invalid credentials for account creation.",
      errors: validateResult.errors
    });
  }
});

// Login admin
router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Admins.findBy({ username })
    .first()
    .then(admin => {
      if (admin && bcrypt.compareSync(password, admin.password)) {
        const token = getJwtToken(admin.username);
        res
          .status(200)
          .json({ message: `Welcome back ${admin.username}!`, token, id: `${admin.id}` });
      } else {
        res.status(401).json({ message: "Invalid admin credentials, unauthorized." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: `There was an error: ${error}.` });
    });
});

// jwtToken Request
function getJwtToken(username) {
  const payload = {
    username
  };

  const secret = process.env.JWT_SECRET || "token safe, token secret";

  const options = {
    expiresIn: "8h"
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;