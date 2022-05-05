const mongoose = require("mongoose");

// to create schema
const userVerifiedSchema = mongoose.Schema({
  userId: String,
  userUniqueString: String,
  createdAt: Date,
  expireAt: Date,
  password: String,
  profile: String,
  bio: String,
  isAdmin: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  verified: Boolean
});

// to create module
const UserVerified = mongoose.model("UserVerified", userVerifiedSchema);

// export this User model schema
module.exports = UserVerified;
