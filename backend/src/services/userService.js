const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail, verifyOtp } = require('../repositories/userRepository');
const { sendOtp } = require('./mailService');

const signup = async (username, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await createUser(username, email, hashedPassword, otp);
  await sendOtp(email, otp);

  return { message: 'OTP sent to your email' };
};

const verifyUserOtp = async (email, otp) => {
  const result = await verifyOtp(email, otp);
  if (result.affectedRows === 0) throw new Error('Invalid OTP');
  return { message: 'User verified successfully' };
};

const login = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('User not found');
  if (!user.is_verified) throw new Error('User not verified');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Incorrect password');

  return { message: 'Login successful', user };
};

module.exports = { signup, verifyUserOtp, login };
