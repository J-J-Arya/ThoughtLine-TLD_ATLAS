const db = require('../config/db');

const createUser = (username, email, hashedPassword, otp) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (username, email, password, otp) VALUES (?, ?, ?, ?)';
    db.query(query, [username, email, hashedPassword, otp], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

const verifyOtp = (email, otp) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE users SET is_verified = 1, otp = NULL WHERE email = ? AND otp = ?';
    db.query(query, [email, otp], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = { createUser, findUserByEmail, verifyOtp };
