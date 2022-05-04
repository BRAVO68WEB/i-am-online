const mongoose = require("mongoose");
const keys = require("./keys");

const db = mongoose
  .connect(keys.mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    return mongoose.connection.getClient();
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
