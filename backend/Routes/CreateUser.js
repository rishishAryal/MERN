const express = require("express");
const router = express.Router();
const User = require("../models/User");

module.exports = router.post("/createUser", async (req, res) => {
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
});
