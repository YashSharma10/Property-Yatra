import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  sellPrice: { type: Number},
  rentPrice: { type: Number },
  description: { type: String },
  propertyAge: { type: Number },
  area: { type: Number },
  listingType: { type: String, required: true }, //sell or rent
  propertyType: { type: String, required: true }, // residential pg commercial etc
  address: {
    house: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
  },
  features: {
    parking: { type: Boolean },
    water: { type: Boolean },
    electricity: { type: Boolean },
    swimmingPool: { type: Boolean },
    modularKitchen: { type: Boolean },
    balcony: { type: Boolean },
    park: { type: Boolean },
    furnished: { type: Boolean },
    meetingRoom: { type: Boolean },
    meal: { type: Boolean },
    ac: { type: Boolean },
    wifi: { type: Boolean },
    boundaryWall: { type: Boolean },
    gym: { type: Boolean },
  },
  images: [String],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  views: { type: Number, default: 0 },
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
