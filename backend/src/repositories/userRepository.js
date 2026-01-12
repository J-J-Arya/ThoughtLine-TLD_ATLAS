const db = require("../config/db");

//CREATE USER
const createUser = (email, hashedPassword, otp) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO users (email, password, otp) VALUES (?, ?, ?)";
    db.query(query, [email, hashedPassword, otp], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

//FIND USER BY EMAIL
const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

//UPDATE OTP (RESEND OTP)
const updateUserOtp = (email, otp) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE users SET otp = ? WHERE email = ?";
    db.query(query, [otp, email], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

//VERIFY OTP & ACTIVATE USER
const verifyOtpAndActivateUser = (email, otp) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE users
      SET is_verified = 1, otp = NULL
      WHERE email = ? AND otp = ?
    `;
    db.query(query, [email, otp], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

//SAVE RESET TOKEN
const saveResetToken = (email, token, expiry) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?";
    db.query(query, [token, expiry, email], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const findUserByResetToken = (token) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()";
    db.query(query, [token], (err, results) => {
      if (err) return reject(err);
      console.log("Token search results:", results); // 🔹 Debug
      resolve(results[0]);
    });
  });
};


//UPDATE PASSWORD
const updatePassword = (userId, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const query =
      "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?";
    db.query(query, [hashedPassword, userId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  createUser,
  findUserByEmail,
  updateUserOtp,
  verifyOtpAndActivateUser,
  saveResetToken,
  findUserByResetToken,
  updatePassword
};
