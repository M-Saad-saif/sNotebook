const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "iamcaptainsaadsaif";

// ROUTE 1: creating a user using : POST '/api/auth/create. no login required
router.post(
  "/create",

  // validation suing express validator 
  [
    body("name", "Enter proper name").isLength({ min: 2 }),
    body("email", "Enter proper email").isEmail(),
    body("password")
      .exists()
      .withMessage("Password should not be blank")
      .isLength({ min: 4 })
      .withMessage("must be at least 4 chars long")
      .matches(/\d/)
      .withMessage("must contain a number"),
  ],
  async (req, res) => {
    // if there are error return bad statu using express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10); //generate random number
    const securePass = await bcrypt.hash(req.body.password, salt); // hash your pasword by adding somwthing

    // if user exist with email ... error and bad status will return
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with this email already exist" });
      }

      // saving user in moongese and creating new users
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      // giving user the authtoken in json form
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });

      // returning result into json
      // res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("some error occured");
    }
  }
);

// ROUTE 2: authenticate a user using : POST '/api/auth/login. login required
router.post(
  "/login",

  // validation suing express validator
  [
    body("email", "Enter proper email").isEmail(),
    body("password")
      .exists()
      .withMessage("Password should not be blank")
      .isLength({ min: 4 })
      .withMessage("Must be at least 4 chars long")
      .matches(/\d/)
      .withMessage("Must contain a number"),
  ],
  async (req, res) => {
    // if there are error return bad statu  usign express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // checking if the email is wrong
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "login with correct credentials" });
      }

      // checking if the password is wrong
      let comparePass = await bcrypt.compare(password, user.password);
      if (!comparePass) {
        return res
          .status(400)
          .json({ error: "login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      // giving user the authtoken in json form usign JWT
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json(authtoken);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("some error occured");
    }
  }
);

// ROUTE 3: get loggedIn  user detail : POST '/api/auth/hetuser. login required
// using middle ware 
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("some error occured");
  }
});

module.exports = router;
