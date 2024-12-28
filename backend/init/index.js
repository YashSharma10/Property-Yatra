const mongoose = require("mongoose");
const initData = require("./data.js");
const Property = require("../models/PropertySchema.js");

const MONGO_URL = "mongodb+srv://yash22csu295:8076107814@cluster0.orkbg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Property.deleteMany({});
  await Property.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();