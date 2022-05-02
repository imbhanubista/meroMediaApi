const mongoose = require("mongoose");

// to create schema
const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  phone: Number,
  password: String,
  photo: String,
  isAdmin: {type : Boolean,default : false},
  isBanned: {type : Boolean,default : false},

});

// to create module
const Users = mongoose.model("Users", userSchema);

// export this User model schema
module.exports = Users;
