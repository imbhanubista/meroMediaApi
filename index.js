const express = require("express");
const app = express();
const compression = require('compression')
//using dot env
require("dotenv").config();
//port to run the code on
const port = process.env.PORT || 3000;
// cors handle
const cors = require('cors')
app.use(cors())

// compress all the responses
app.use(compression())

// database
const { connection } = require("./helpers/database/connection");
connection();


// app.use('/',(req,res)=>{
//     res.json({
//         type:"Success",
//         msg:"Welcome home buddy"
//     })
// })

 // fileupload
 const fileUpload = require("express-fileupload");

//using express json for input taking
app.use(express.urlencoded({ 
  extended: true, 
  limit : 500000 * 1024 * 1024 
}));
// app.use(express.json())
app.use(fileUpload({
  limits: { fileSize: 500000 * 1024 * 1024 },
  debug : true,
}));
app.use(express.json());

app.use(express.static('public'))










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
