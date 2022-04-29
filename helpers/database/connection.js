const mongoose = require("mongoose");

const connection = () => {
  let database = process.env.DB_URL || "mongodb://localhost:27017/media";

  //  to connect with database
  mongoose.connect(database, (err) => {
    if (err) {
      console.log("Error occur while connecting database");
    } else {
      console.log("Database connected");
    }
  });
};

module.exports = { connection };
