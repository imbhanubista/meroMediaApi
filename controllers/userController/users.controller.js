const Users = require("../../models/users/users.models");

// start of list users
exports.listUsers = async (req, res) => {
  try {
    let allUsers = await Users.find({});
    res.json({
      type: "success",
      msg: "List of all users.",
      data: {
        allUsers,
      },
    });
  } catch (err) {
    res.json({
      type: "error",
      msg: err.message,
    });
  }
};
// end of list user function

//start function to block and unblock user
exports.blockedUser = async (req, res) => {
  let { id } = req.params;
  let validUser = await Users.findOne({ _id: id });
  if (validUser === null) {
    res.json({
      type: "error",
      msg: "User doesn't exist",
    });
  } else {
    try {
      if (validUser.isBanned === false) {
        await Users.updateOne(
          { _id: id },
          {
            $set: {
              isBanned: true,
            },
          }
        );
        res.json({
          type: "success",
          msg:`${validUser.name} is blocked!`,
        });
      } else if (validUser.isBanned === true) {
        await Users.updateOne(
          { _id: id },
          {
            $set: {
              isBanned: false,
            },
          }
        );
        res.json({
          type: "success",
          msg: `${validUser.name} is unblocked!`,
        });
      }
    } catch (err) {
      res.json({
        type: "error",
        msg: err.msg,
      });
    }
  }
};

//start function to block and unblock user
