const express = require("express");
const app = express();
//using dot env
require("dotenv").config();
//port to run the code on
const port = process.env.PORT || 3000;
// cors handle
const cors = require('cors')
app.use(cors())
//using express json for input taking
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// database
const { connection } = require("./helpers/database/connection");
connection();
// fileupload
const fileUpload = require("express-fileupload");
app.use(fileUpload());

// app.use('/',(req,res)=>{
//     res.json({
//         type:"Success",
//         msg:"Welcome home buddy"
//     })
// })

// router
const router = require("./routing/router");
app.use("/api", router);

// app to listen in server side
app.listen(port, (err) => {
  if (err) {
    console.log(`Oops !!! something went wrong at port ${port}`);
  } else {
    console.log(`Hey ! buddy Happy Coding on port ${port}`);
  }
});
