// user model
const { signupValidation } = require("../../helpers/validator/authValidation");
const Users = require("../../models/users/users.models");
const bcrypt = require("bcrypt");
const {
  emailTaken,
  usernameTaken,
  signupSuccess,
} = require("../../helpers/responses/commonResponse");
const mail = require("../../helpers/mailHelper/mail.helper");

exports.signup = async (req, res) => {
  let { name, username, email, phone, password } = req.body;
  // console.log(phone.length);
  // to validate the user form input
  let validation = signupValidation.validate({
    name,
    email,
    username,
    phone,
    password,
  });
  if (validation.error) {
    res.json({
      type: "error",
      msg: validation.error.details[0].message,
    });
  } else {
    try {
      // to hashing normal password
      let hashedPassword = await bcrypt.hash(password, 15);
      // to make sure user cannot register when the email is already register
      let isEmailExist = await Users.findOne({ email });
      let isUsernameExist = await Users.findOne({ username });
      if (isEmailExist !== null) {
        res.json({
          type: "error",
          msg: emailTaken,
        });
      } else if (isUsernameExist !== null) {
        res.json({
          type: "error",
          msg: usernameTaken,
        });
      } else {
        mail(
          email,
          "Successfully signup",
          "<p>Thanks for being part of it.</p>"
        );
        // to save the user data to the database
        await new Users({
          name,
          username,
          email,
          password: hashedPassword,
          phone,
          // photo:path
        }).save();
        res.json({
          type: "success",
          msg: signupSuccess,
        });
      }
    } catch (err) {
      res.json({
        type: "error",
        msg: err.message,
      });
    }
    // }
  }
};
