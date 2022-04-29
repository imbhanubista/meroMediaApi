const { path } = require("express/lib/application");
const res = require("express/lib/response");
const fileUpload = require("../../helpers/fileUpload.helper");
const { validateThumb } = require("../../helpers/validator/authValidation");
const Thumbnail = require("../../models/mediaModel/thumbnail.model");

exports.createThumbnail = async (req, res) => {
  let { title } = req.body;

  const validator = validateThumb.validate({
    title,
  });
  if (validator.error) {
    res.json({
      type: "error",
      msg: validator.error.details[0].message,
    });
  } else if (!req.files || !req.files.thumbnail) {
    res.json({
      type: "error",
      msg: "No file found!",
    });
  } 
  
  else {
       let file = req.files.thumbnail
    let path = "images/thumbnail" + file.name;
    fileUpload(file,path);
    // file.mv("public" + path, (err) => {});
    try {
      await new Thumbnail({
        title,
        thumbnail: path,
      }).save();
      res.json({
        type: "success",
        msg: "Successfully saved thumbnail!",
      });
    } catch (e) {
      res.json({
        type: "error",
        msg: e.message,
      });
    }
  }
};

// for list of thumbnails
exports.listThumbnail = async (req, res) => {
  try {
    let allThumbnails = await Thumbnail.find({});
    res.json({
      type: "success",
      msg: "List of Thumbnail",
      data: {
        allThumbnails,
      },
    });
  } catch (e) {
    res.json({
      type: "error",
      msg: e.message,
    });
  }
};

// edit thumbnail
exports.editThumbnail = async (req, res) => {
  let { id, title } = req.body;
  try {
    await Thumbnail.updateOne(
      { _id: id },
      {
        $set: {
          title,
          thumbnail: path,
        },
      }
    );
    res.json({
      type: "success",
      msg: "Successfully updated!",
    });
  } catch (e) {
    res.json({
      type: "error",
      msg: e.message,
    });
  }
};
