const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://yash22csu295:8076107814@cluster0.orkbg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connectDb() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connected");
  } catch (err) {
    console.error("Error connecting to database", err);
    process.exit(1);
  }
}

module.exports = { connectDb };
