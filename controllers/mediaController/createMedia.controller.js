const {
  validateMediaUpload,
} = require("../../helpers/validator/authValidation");
const Media = require("../../models/mediaModel/media.model");
exports.createMedia = async (req, res) => {
  let { title, description, price, tag } = req.body;
  // to validate
  let validator = validateMediaUpload.validate({
    title,
    description,
    price,
    tag,
  });
  if (validator.error) {
    res.json({
      type: "error",
      msg: validator.error.details[0].message,
    });
  } else {
    // for thumbnail
    if (!req.files || !req.files.thumbnail) {
      res.json({
        type: "error",
        msg: "Thumbnail shouldn't be empty!",
      });
    }
    // for preview video
    else if (!req.files || !req.files.previewVideo) {
      res.json({
        type: "error",
        msg: "Need to provide Preview video",
      });
    }
    // for original video
    else if (!req.files || !req.files.actualVideo) {
      res.json({
        type: "error",
        msg: "Original Video should provide.",
      });
    } else {
      // for upload files
      let thumb = req.files.thumbnail;
      let preVideo = req.files.previewVideo;
      let actualVideo = req.files.actualVideo;

      // to validate the files
      let fileSizeMessage = "";
      let fileTypeMessage = "";
      if (
        thumb.mimetype !== "image/jpeg" &&
        thumb.mimetype !== "image/png" &&
        thumb.mimetype !== "image/jpg"
      ) {
        fileTypeMessage = "Thumbnail type should be jpg, jpeg or png ";
      } else if (
        preVideo.mimetype !== "video/mp4" &&
        preVideo.mimetype !== "video/x-msvideo"
      ) {
        fileTypeMessage = "Unsupported preview video format";
      } else if (
        actualVideo.mimetype !== "video/mp4" &&
        actualVideo.mimetype !== "video/x-msvideo"
      ) {
        fileTypeMessage = "Unsupported original video format";
      } else if (thumb.size > 5000000) {
        fileSizeMessage = "Thumbnail size must be less than 5MB";
      } else if (preVideo.size > 15000000) {
        fileSizeMessage = "Preview video must be less than 15MB";
      } else if (actualVideo.size > 30000000) {
        fileSizeMessage = "Original video size should be less than 30MB";
      }
      if (fileSizeMessage !== "") {
        res.json({
          type: "error",
          msg: fileSizeMessage,
        });
      } else if (fileTypeMessage !== "") {
        res.json({
          type: "error",
          msg: fileTypeMessage,
        });
      } else {
        // path for each file
        let thumbPath = "/images/thumbnail/" + thumb.name;
        let preVideoPath = "/preview/" + preVideo.name;
        let actualVideoPath = "/originalVideo/" + actualVideo.name;

        // to move the file
        // to error message
        // let uploadError = ""
        thumb.mv("public" + thumbPath, (err) => {});
        preVideo.mv("public" + preVideoPath, (err) => {});
        actualVideo.mv("public" + actualVideoPath, (err) => {});
        try {
          await new Media({
            title,
            description,
            price,
            tag,
            thumbnail: thumbPath,
            previewVideo: preVideoPath,
            actualVideo: actualVideoPath,
          }).save();
          res.json({
            type: "success",
            msg: "Media saved successfully!",
          });
        } catch (error) {
          res.json({
            type: "error",
            msg: error.message,
          });
        }
      }
    }
  }
};
