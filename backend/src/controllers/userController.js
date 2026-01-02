const {
  signup,
  verifyUserOtp,
  login,
  forgotPassword,
  resetPassword
} = require('../services/userService');

/* ============================
   SIGNUP CONTROLLER
============================ */
const signupController = async (req, res) => {
  try {
    const {email, password } = req.body;
    const result = await signup(email, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ============================
   VERIFY OTP CONTROLLER
============================ */
const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await verifyUserOtp(email, otp);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ============================
   LOGIN CONTROLLER
============================ */
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ============================
   FORGOT PASSWORD CONTROLLER
============================ */
const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await forgotPassword(email);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ============================
   RESET PASSWORD CONTROLLER
============================ */
const resetPasswordController = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const result = await resetPassword(token, newPassword);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/* ============================
   EXPORTS
============================ */
module.exports = {
  signup: signupController,
  verifyOtp: verifyOtpController,
  login: loginController,
  forgotPassword: forgotPasswordController,
  resetPassword: resetPasswordController
};
