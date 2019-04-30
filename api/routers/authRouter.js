const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { users } = require("../../data/helpers/dbHelpers.js");
const secret = process.env.SECRET || ".env is not working right now";
const jwtSecret = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const newUser = req.body;
  if (newUser.username && newUser.password) {
    try {
      const hashword = bcrypt.hashSync(newUser.password, 12);
      newUser.password = hashword;
      user = await users.registerUser(newUser);
      console.log(user);
      if (user) {
        const token = createToken(user);
        res.status(201).json({ message: `Welcome ${user.username}`, token });
      } else {
        res
          .status(400)
          .json({ err: "Couldn't register user, please check credentials" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: "There was a problem registering user" });
    }
  } else {
    res.status(400).json({ err: "Please provide username & password" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username && password) {
      //check for username and password
      const checkUser = await users.getByName(username); //verify user existence
      if (checkUser && bcrypt.compareSync(password, checkUser.password)) {
        console.log(checkUser)
        //compare passwords
        const token = createToken(checkUser); //send JWT for authentication purposes
        res.status(200).json({ message: `Welcome ${username}!`, token });
      } else {
        //responds if password doesn't match
        res.status(404).json({ err: "Please provide correct credentials" });
      }
    } else {
      //response if posted object is improperly shaped
      res.status(400).json({ err: "Please provide username and password" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "There was a problem with your request" });
  }
});

function createToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
