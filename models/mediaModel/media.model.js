const mongoose = require("mongoose");
const Users = require("../users/users.models");

const mediaSchema = mongoose.Schema({
  title: String,
  thumbnail: String,
  actualVideo: String,
  previewVideo: String,
  price: Number,
  description: String,
  tag: String,
  created_by:{type:String, ref:Users}
});
mediaSchema.index({title:'text', description:'text'})

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
