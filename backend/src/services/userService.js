const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const {
  createUser,
  findUserByEmail,
  verifyOtp,
  saveResetToken,
  findUserByResetToken,
  updatePassword
} = require('../repositories/userRepository');

const {
  sendOtp,
  sendPasswordResetLink
} = require('./mailService');

/* ============================
   SIGNUP (WITH OTP)
============================ */
const signup = async (username, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await createUser(username, email, hashedPassword, otp);
  await sendOtp(email, otp);

  return { message: 'OTP sent to your email' };
};

/* ============================
   VERIFY OTP
============================ */
const verifyUserOtp = async (email, otp) => {
  const result = await verifyOtp(email, otp);

  if (result.affectedRows === 0) {
    throw new Error('Invalid OTP');
  }

  return { message: 'User verified successfully' };
};

/* ============================
   LOGIN
============================ */
const login = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error('User not found');
  }

  if (!user.is_verified) {
    throw new Error('User not verified');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error('Incorrect password');
  }

  // Do not send sensitive fields
  delete user.password;
  delete user.otp;
  delete user.reset_token;
  delete user.reset_token_expiry;

  return {
    message: 'Login successful',
    user
  };
};

/* ============================
   FORGOT PASSWORD
============================ */
const forgotPassword = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  // Generate token and expiry
  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now
    .toISOString().slice(0, 19).replace('T', ' '); // MySQL DATETIME format

  await saveResetToken(email, token, expiry);

  const resetLink = `http://localhost:3000/reset-password?token=${token}`;
  console.log('Reset link:', resetLink); // Debugging log

  await sendPasswordResetLink(email, resetLink);

  return { message: 'Password reset link sent to your email' };
};

/* ============================
   RESET PASSWORD
============================ */
const resetPassword = async (token, newPassword) => {
  const user = await findUserByResetToken(token);

  if (!user) {
    throw new Error('Invalid or expired reset token');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updatePassword(user.id, hashedPassword);

  return { message: 'Password reset successful' };
};

/* ============================
   EXPORTS
============================ */
module.exports = {
  signup,
  verifyUserOtp,
  login,
  forgotPassword,
  resetPassword
};
