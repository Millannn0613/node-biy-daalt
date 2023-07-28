const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.mongodb_url);
};
module.exports = connectDB;
