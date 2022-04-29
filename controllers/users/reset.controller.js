const {
  codeWrong,
  notPassword,
  resetSuccess,
} = require("../../helpers/responses/commonResponse");
const { validateReset } = require("../../helpers/validator/authValidation");
const ForgetPass = require("../../models/users/forgetPass.model");
const Users = require("../../models/users/users.models");
const bcrypt = require("bcrypt");

exports.resetPass = async (req, res) => {
  let { password, cpassword, email, code } = req.body;

  // to validate the user input field
  let validator = validateReset.validate({
    password,
    cpassword,
    email,
  });
  // to check users forgot password email and code
  let conformUser = await ForgetPass.findOne({
    $and: [{ email }, { code }],
  });
  if (validator.error) {
    res.json({
      type: "error",
      msg: validator.error.details[0].message,
    });
  } else if (conformUser === null) {
    res.json({
      type: "error",
      msg: codeWrong,
    });
  } else if (password !== cpassword) {
    res.json({
      type: "error",
      msg: notPassword,
    });
  } else {
    let registerEmail = await Users.findOne({ email });
    if (registerEmail !== null) {
      try {
        let hashedPassword = await bcrypt.hash(password, 15);
        await Users.updateOne(
          { email },
          {
            $set: {
              password: hashedPassword,
            },
          }
        );
        res.json({
          type: "success",
          msg: resetSuccess,
        });
      } catch (err) {
        res.json({
          type: "error",
          msg: err.message,
        });
      }
    }
  }
};
