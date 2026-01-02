const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

// ✅ Send OTP
const sendOtp = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP for TLD Atlas',
    text: `Your OTP is: ${otp}`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) reject(err);
      else resolve(info);
    });
  });
};

// ✅ Send Password Reset Link
const sendPasswordResetLink = (email, resetLink) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Reset your TLD Atlas password',
    text: `Click the link to reset your password:\n\n${resetLink}\n\nThis link expires in 15 minutes.`
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) reject(err);
      else resolve(info);
    });
  });
};

module.exports = {
  sendOtp,
  sendPasswordResetLink
};
