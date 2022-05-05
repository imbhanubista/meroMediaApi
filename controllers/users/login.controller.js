const {
  notUser,
  NotPass,
  loggedIn,
} = require("../../helpers/responses/commonResponse");
const { loginValidation } = require("../../helpers/validator/authValidation");
const Users = require("../../models/users/users.models");
const bcrypt = require("bcrypt");
const mail = require("../../helpers/mailHelper/mail.helper");
// jwt
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  let { username, password } = req.body;
  let validation = loginValidation.validate({
    username,
    password,
  });
  if (validation.error) {
    res.json({
      type: "error",
      msg: validation.error.details[0].message,
    });
  } else {
    let userDetails = await Users.findOne({ username });

    if (userDetails === null) {
      res.json({
        type: "error",
        msg: notUser,
      });
    } 
    else if(userDetails.isBanned === true){
      res.json({
        type:"error",
        msg:"You are not allowed to login"
      })
    }
    else if (!(await bcrypt.compare(password, userDetails.password))) {
      res.json({
        type: "error",
        msg: NotPass,
      });
    } else {
      try {
        mail(
          userDetails.email,
          "Logged in",
          "<em>You have been logged in</em>"
        );
        let token = jwt.sign(
          {
            email: userDetails.email,
            _id: userDetails._id,
            isAdmin: userDetails.isAdmin,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.json({
          type: "success",
          msg: loggedIn,
          data: {
            name: userDetails.name,
            email: userDetails.email,
            isAdmin: userDetails.isAdmin,
            token,
          },
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
