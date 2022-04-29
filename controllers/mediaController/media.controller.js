const Media = require("../../models/mediaModel/media.model");

exports.editMedia = async (req, res) => {
  let { id, title, description, price, tag } = req.body;

  let fileTypeError = "";
  let formatError = "";
  let thumbPath,actualVideoPath,preVideoPath 
  if (req.files && req.files.thumbnail) {
    //check size and type of thumbnail
    //if all good, upload it

    if (req.files.thumbnail.size > 5000000) {
      fileTypeError = "Thumbnail should be less than 5MB";
    } else if (
      req.files.thumbnail.mimetype !== "image/jpg" &&
      req.files.mimetype !== "image/png" &&
      req.files.thumbnail !== "image/jpeg"
    ) {
      formatError = "Unsupported format";
    }
    // to define the path
    thumbPath = "images/thumbnail/" + req.files.thumbnail;
    // to move
    req.files.thumbnail.mv("public/" + thumbPath, (err) => {});
  } else if (req.files && req.files.previewVideo) {
    if (req.files.previewVideo.size > 15000000) {
      fileTypeError = "Preview video should be less than 15MB";
    } else if (
      req.files.previewVideo.mimetype !== "video/mp4" &&
      req.files.previewVideo !== "video/x-msvideo"
    ) {
      formatError = "Unsupported preview video format!";
    }
     preVideoPath = "/preview/" + req.files.previewVideo;
    req.files.previewVideo.mv("public" + preVideoPath, (err) => {});
  } else if (req.files && req.files.actualVideo) {
    if (req.files.actualVideo.size > 30000000) {
      fileTypeError = "Original Video size must be less than 30MB";
    } else if (
      req.files.actualVideo.mimetype !== "video/mp4" &&
      req.files.actualVideo !== "video/x-msvideo"
    ) {
      formatError = "Unsupported original video format!";
    }
     actualVideoPath = "/originalVideo/" + req.files.actualVideo;
    req.files.actualVideo.mv("public" + actualVideoPath, (err) => {});
  }
  if (fileTypeError !== "") {
    res.json({
      type: "error",
      msg: fileTypeError,
    });
  } else if (formatError !== "") {
    res.json({
      type: "error",
      msg: formatError,
    });
  } else {
    try {
      await Media.updateOne(
        { _id: id },
        {
          $set: {
            title,
            description,
            price,
            tag,
            thumbnail: thumbPath,
            previewVideo: preVideoPath,
            actualVideo: actualVideoPath,
          },
        }
      );
      res.json({
        type: "success",
        msg: "Media updated successfully",
      });
    } catch (err) {
      res.json({
        type: "error",
        msg: err.message,
      });
    }
  }
};
