const Users = require("../../models/users/users.models");
const ForgetPass = require("../../models/users/forgetPass.model");
const mail = require("../../helpers/mailHelper/mail.helper");
// for code generator
const { customAlphabet, nanoid } = require("nanoid");
exports.forgetPass = async (req, res) => {
  let { email } = req.body;
  let code = customAlphabet("0123456789", 4)();
  let isAUser = await Users.findOne({ email });
  if (isAUser !== null) {
    try {
      await new ForgetPass({
        email,
        code,
      }).save();
      mail(
        email,
        "Reset password.",
        `<em>YOur code to reset password is :</em> <h4>+${code}</h4>`
      );
      res.json({
        type: "success",
        msg: "Password reset code is sent to " + email,
      });
    } catch (err) {
      res.json({
        type: "error",
        msg: err.message,
      });
    }
  }
};
