const { path } = require("express/lib/application");
const res = require("express/lib/response");
const fileUpload = require("../../helpers/fileUpload.helper");
const { validateThumb } = require("../../helpers/validator/authValidation");
const Thumbnail = require("../../models/mediaModel/thumbnail.model");

exports.createThumbnail = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  console.log(req.headers);
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
  } else {
    let file = req.files.thumbnail;
    let path = "/images/thumbnail" + file.name;
    fileUpload(file, path);
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

//take id
//check if title is all good
//check if file is present
//if file is present, upload it and get the uploaded path
//if file is not present, the path should be the same path
//update the data based on id

exports.updateThumbnail = async (req, res) => {
  let { id } = req.params;
  let { title } = req.body;

  //validate title, etc before this
  let validator = validateThumb.validate({
    title,
  });
  if (validator.error) {
    res.json({
      type: "error",
      msg: validator.error.details[0].message,
    });
  }
  let thumbnailUrlPath = "";
  if (req.files && req.files.thumbnail) {
    //define new thumbnail saving path, and set it to thumbnailUrlPath
    //move the thumbnail to the path
    let thumbPath = "/images/thumbnail/" + req.files.thumbnail;
    thumbnailUrlPath = thumbPath;
    req.files.thumbnail.mv("public" + thumbnailUrlPath, (err) => {});
  } else {
    //no thumbnail was provided by user, so we don't need to upate the thumbnail
    // thumbnailUrlPath = currentthumbail on database
    let dbThumbnailPath = await Thumbnail.findOne({ id });
    console.log(dbThumbnailPath);
    thumbnailUrlPath = dbThumbnailPath.thumbnail;
  }

  try {
    await Thumbnail.updateOne(
      { _id: id },
      {
        $set: {
          title,
          thumbnail: thumbnailUrlPath,
        },
      }
    );
    res.json({
      type: "success",
      msg: "Successfully updated!",
    });
  } catch (err) {
    res.json({
      type: "error",
      msg: err.message,
    });
  }
  //update the data with `title` as `title` , `thumbnail` as `thumbnailUrlPath`
};

// start of delete thumbnail function
exports.deleteThumbnail = async (req, res) => {
  let { id } = req.params;
  try {
    await Thumbnail.deleteOne({ _id: id });
    res.json({
      type: "success",
      msg: "Thumnail deleted successfully",
    });
  } catch (err) {
    res.json({
      type: "error",
      msg: err.message,
    });
  }
};

// end of delete function

// start of edit thumbnail
exports.editThumbnail = async (req, res) => {
  let { id } = req.params;
  try {
    let editableData = await Thumbnail.findOne({ _id: id });
    res.json({
      type: "success",
      msg: "Data to edit are:",
      data: editableData,
    });
  } catch (err) {
    res.json({
      type: "error",
      msg: err.message,
    });
  }
};

// end of edit thumbnail
