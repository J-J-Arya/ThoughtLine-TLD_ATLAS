const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const {
  createUser,
  findUserByEmail,
  verifyOtpAndActivateUser,
  saveResetToken,
  findUserByResetToken,
  updatePassword,
  updateUserOtp
} = require("../repositories/userRepository");

const {
  sendOtp,
  sendPasswordResetLink
} = require("./mailService");

/* ============================
   SIGNUP (EMAIL + PASSWORD)
============================ */
const signup = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const existingUser = await findUserByEmail(email);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // ✅ Case 1: User exists & already verified
  if (existingUser && existingUser.is_verified) {
    throw new Error("Email already registered");
  }

  // ✅ Case 2: User exists but NOT verified → resend OTP
  if (existingUser && !existingUser.is_verified) {
    await updateUserOtp(email, otp);
    await sendOtp(email, otp);
    return { message: "OTP resent to your email" };
  }

  // ✅ Case 3: New user
  const hashedPassword = await bcrypt.hash(password, 10);

  await createUser(email, hashedPassword, otp);
  await sendOtp(email, otp);

  return { message: "OTP sent to your email" };
};

/* ============================
   VERIFY OTP
============================ */
const verifyUserOtp = async (email, otp) => {
  if (!email || !otp) {
    throw new Error("Email and OTP are required");
  }

  const result = await verifyOtpAndActivateUser(email, otp);

  if (result.affectedRows === 0) {
    throw new Error("Invalid OTP");
  }

  return { message: "User verified successfully" };
};

/* ============================
   LOGIN
============================ */
const login = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  if (!user.is_verified) {
    throw new Error("User not verified");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Incorrect password");
  }

  delete user.password;
  delete user.otp;
  delete user.reset_token;
  delete user.reset_token_expiry;

  return {
    message: "Login successful",
    user
  };
};

/* ============================
   FORGOT PASSWORD
============================ */
const forgotPassword = async (email) => {
  if (!email) throw new Error("Email is required");

  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  // Generate token
  const token = crypto.randomBytes(32).toString("hex");
  console.log("Generated reset token:", token); // 🔹 Debug: copy this for testing

  // Expiry: 15 minutes from now
  const expiry = new Date(Date.now() + 15 * 60 * 1000);

  // Save token and expiry in DB
  await saveResetToken(email, token, expiry);

  // Prepare reset link
  const resetLink = `http://localhost:5173/reset-password?token=${token}`;

  // Send email
  await sendPasswordResetLink(email, resetLink);

  return { message: "Password reset link sent to your email" };
};

/* ============================
   RESET PASSWORD
============================ */
const resetPassword = async (token, newPassword) => {
  if (!token || !newPassword) throw new Error("Token and new password are required");

  // Debug: check if token exists in DB
  const user = await findUserByResetToken(token);
  console.log("User found for reset token:", user); // 🔹 Debug

  if (!user) throw new Error("Invalid or expired reset token");

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password & clear token
  await updatePassword(user.id, hashedPassword);

  return { message: "Password reset successful" };
};


module.exports = {
  signup,
  verifyUserOtp,
  login,
  forgotPassword,
  resetPassword
};
