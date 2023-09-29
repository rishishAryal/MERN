const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "mySuperSecretString123!@#$";
const User = require("../models/User");

router.use(bodyParser.json());

router.post(
  "/createUser",
  body("email").isEmail(),
  body("name").isLength({ min: 5 }),
  body("password").isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        geolocation: req.body.geolocation,
        password: hashedPassword,
      });

      await user.save();

      //get the jwt token
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);

      console.log("User created successfully");
      res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ success: false });
    }
  }
);

router.post(
  "/loginUser",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log("Logging in user...");
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "No user of thus email" });
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Password" });
      }
      //get the jwt token
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);
      console.log("User logged in successfully");
      res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ success: false });
    }
  }
);

//logout user and remove the auth token
router.post("/logoutUser", (req, res) => {
  console.log("User logged out successfully");
  res.json({ success: true, authToken: null });
});



module.exports = router;
