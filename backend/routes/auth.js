const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      role
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(400).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).send("Invalid password");

   const token = jwt.sign(
  { id: user._id, role: user.role, username: user.username },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

    res.json({ token, role: user.role });

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;