const Media = require("../../models/mediaModel/media.model");

exports.updateMedia = async (req, res) => {
  let { id } = body.params;
  let { title, description, price, tag } = req.body;

  let fileTypeError = "";
  let formatError = "";
  let thumbPath, actualVideoPath, preVideoPath;
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

//start of list of media
exports.listMedia = async (req, res) => {
  try {
    let allMedia = await Media.find({});
    res.json({
      type: "success",
      msg: "All list of media",
      data: {
        allMedia,
      },
    });
  } catch (err) {
    res.json({
      type: "error",
      msg: err.message,
    });
  }
};
// end of lisst of media

// delete media part start

exports.deleteMedia = async (req, res) => {
  let { id } = req.params;
  try {
    await Media.deleteOne({ _id: id });
    res.json({
      type: "success",
      msg: "Media has been deleted!",
    });
  } catch (err) {
    res.json({
      type: "error",
      msg: err.message,
    });
  }
};
// end of delete media part

// start of edit media part
exports.editMedia = async (req, res) => {
  let { id } = req.params;
  try {
    let editableMedia = await Media.findOne({ _id: id });
    res.json({
      type: "success",
      msg: "Media to edit :",
      data: editableMedia,
    });
  } catch (err) {
    res.json({
      type: "error",
      msg: err.message,
    });
  }
};
// end of edit media part

exports.userMediaList = async (req, res) => {
  try {
    let allMedia = await Media.find({},"thumbnail title price");
    res.json({
      type: "success",
      msg: "All list of media",
      data: {
        allMedia
      },
    });
  } catch (err) {
    res.json({
      type: "error",
      msg: err.message,
    });
  }
};
// // end of lisst of media


// to show details of media before login
exports.detailMediaForUnauth = async(req,res)=>{
  let {id} = req.params
  try{
    let detailData = await Media.find({_id:id},"-actualVideo")
    res.json({
      type:"success",
      msg:"Detail about media",
      data: detailData
    })
  }
  catch(err){
    res.json({
      type:"error",
      msg:err.message
    })
  }
}
// end of detail of media before login
