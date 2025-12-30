const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: false,
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

class Mail {
  constructor() {
    this.mailOptions = {
      from: { address: process.env.EMAIL, name: 'TLD ATLAS' }
    };
  }

  setTo(to) { this.mailOptions.to = to; }
  setSubject(subject) { this.mailOptions.subject = subject; }
  setText(text) { this.mailOptions.text = text; }
  send() {
    transporter.sendMail(this.mailOptions, (err, info) => {
      if (err) console.log("Mail error:", err);
      else console.log("Email sent:", info.response);
    });
  }
}

module.exports = Mail;
