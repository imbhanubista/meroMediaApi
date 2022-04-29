const mongoose = require("mongoose");

const mediaSchema = mongoose.Schema({
  title: String,
  thumbnail: String,
  actualVideo: String,
  previewVideo: String,
  price: Number,
  description: String,
  tag: String,
});

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
