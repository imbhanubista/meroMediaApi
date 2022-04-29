const mongoose = require("mongoose");

// to create schema
const thumbnailSchema = mongoose.Schema({
  title: String,
  thumbnail: String,
});

const Thumbnail = mongoose.model("Thumbnail", thumbnailSchema);

module.exports = Thumbnail;
