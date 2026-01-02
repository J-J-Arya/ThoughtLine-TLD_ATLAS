const express = require('express');
const router = express.Router();

const {
  signup,
  verifyOtp,
  login,
  forgotPassword,
  resetPassword
} = require('../controllers/userController');

console.log("USER ROUTES FILE LOADED");

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;