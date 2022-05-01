const { path } = require("express/lib/application");
const res = require("express/lib/response");
const fileUpload = require("../../helpers/fileUpload.helper");
const { validateThumb } = require("../../helpers/validator/authValidation");
const Thumbnail = require("../../models/mediaModel/thumbnail.model");

exports.createThumbnail = async (req, res) => {
  console.log(req.body);
  console.log(req.files)
  console.log(req.headers)
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
    let path = "/images/thumbnail" + file.name;
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
exports.updateThumbnail = async (req, res) => {
  let {id}= req.params
  let {  title } = req.body;
  if(req.files || req.files.thumbnail){
  res.json({
    type:"success",
    msg:"Uploaded successfully"
  })
  }
  
  else{
    let thumbPath = "images/thumbnail/" + req.files.thumbnail
    req.files.thumbnail.mv("public/"+ thumbPath, (err)=>{})
  try {
    await Thumbnail.updateOne(
      { _id: id },
      {
        $set: {
          title,
          thumbnail: thumbPath,
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
  }}
};

// start of delete thumbnail function
exports.deleteThumbnail = async(req,res)=>{
  let {id} = req.params
  try{
    await Thumbnail.deleteOne({_id:id})
    res.json({
      type:"success",
      msg:"Thumnail deleted successfully"
    })
  }
  catch(err){
    res.json({
      type:"error",
      msg:err.message
    })
  }
}

// end of delete function

// start of edit thumbnail
exports.editThumbnail = async(req,res)=>{
  let {id} = req.params
  try{
    let editableData = await Thumbnail.findOne({_id:id})
    res.json({
      type:"success",
      msg:"Data to edit are:",
      data: editableData
    })
  }
  catch(err){
    res.json({
      type:"error",
      msg:err.message
    })
  }
}

// end of edit thumbnail

