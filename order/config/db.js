const mongoose = require("mongoose")
const dotenv = require('dotenv').config()
const colors = require('colors')

const connectDB = async () => {
  try {
    const cn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${cn.connection.host}`.cyan);
  } catch (err) {
    console.log(err);
    console.log("MongoDB connection failed");
    process.exit(1);
  }
}

module.exports = connectDB;