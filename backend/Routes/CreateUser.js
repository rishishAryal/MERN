const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

router.use(bodyParser.json());

module.exports = router.post(
  "/createUser",
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("name").isLength({ min: 5 }).withMessage("Name must be at least 5 characters long"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
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
        location: req.body.location,
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