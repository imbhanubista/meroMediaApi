const mongoose = require("mongoose");

const forgetSchema = mongoose.Schema({
  code: String,
  email: String,
});

const ForgetPass = mongoose.model("ForgetPass", forgetSchema);

module.exports = ForgetPass;
