const res = require("express/lib/response");
const nodemailer = require("nodemailer");

const mail = (to, subject, html) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  var mailTo = {
    from: process.env.EMAIL,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailTo, (err, info) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Mail sent successfully!");
    }
  });
};

module.exports = mail;
