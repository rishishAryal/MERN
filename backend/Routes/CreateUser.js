const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

router.use(bodyParser.json());

module.exports = router.post(
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
      console.log("Creating user...");
      await User.create({
        name: req.body.name,
        email: req.body.email,
        geolocation: req.body.geolocation,
        password: req.body.password,
      });
      console.log("User created successfully");
      res.json({ success: true });
    } catch (error) {
      console.error("Error creating user:", error);
      res.json({ success: false });
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

      if (!user || user.password !== req.body.password) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Email or Password" });
      }

      console.log("User logged in successfully");
      res.json({ success: true });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ success: false });
    }
  }
);

module.exports = router;
