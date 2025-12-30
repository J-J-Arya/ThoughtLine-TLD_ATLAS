const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const Mail = require("../mail");

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

/* ------------------ SIGNUP ------------------ */
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    await db.query(
      "INSERT INTO users (name, email, password, otp, is_verified) VALUES (?, ?, ?, ?, false)",
      [name, email, hashedPassword, otp]
    );

    const mail = new Mail();
    mail.setTo(email);
    mail.setSubject("TLD Atlas - Email Verification");
    mail.setText(`Your verification code is: ${otp}`);
    mail.send();

    res.status(201).json({ message: "Signup successful. OTP sent to email." });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ------------------ VERIFY OTP ------------------ */
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

  try {
    const [users] = await db.query("SELECT id FROM users WHERE email = ? AND otp = ?", [email, otp]);
    if (users.length === 0) return res.status(400).json({ message: "Invalid OTP" });

    await db.query("UPDATE users SET is_verified = true, otp = NULL WHERE email = ?", [email]);
    res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ------------------ LOGIN ------------------ */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) return res.status(400).json({ message: "Invalid credentials" });

    const user = users[0];
    if (!user.is_verified) return res.status(403).json({ message: "Please verify your email first" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
