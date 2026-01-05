const {
  signup,
  verifyUserOtp,
  login,
  forgotPassword,
  resetPassword
} = require("../services/userService");

//SIGNUP

const signupController = async (req, res) => {
  try {
    console.log("HEADERS:", req.headers["content-type"]);
    console.log("BODY:", req.body);

    const { email, password } = req.body;

    const result = await signup(email, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


//VERIFY OTP

const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const result = await verifyUserOtp(email, otp);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//LOGIN

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await login(email, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//FORGOT PASSWORD

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await forgotPassword(email);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//RESET PASSWORD

const resetPasswordController = async (req, res) => {
  try {
    const { token, password } = req.body;

    const result = await resetPassword(token, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  signup: signupController,
  verifyOtp: verifyOtpController,
  login: loginController,
  forgotPassword: forgotPasswordController,
  resetPassword: resetPasswordController
};
