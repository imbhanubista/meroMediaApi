const fileUpload = (files,location) => {
  let file = files;
//   let location = "images/thumbnail"
  file.mv("public" + location,(err)=>{});
};

module.exports = fileUpload;
