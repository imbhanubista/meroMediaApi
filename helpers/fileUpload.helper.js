const fileUpload = (files,location) => {
  let file = files.thumbnail;
//   let location = "images/thumbnail"
  file.mv("public" + location,(err)=>{});
};

module.exports = fileUpload;
