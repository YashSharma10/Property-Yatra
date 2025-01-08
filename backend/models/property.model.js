import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sellPrice: { type: Number, default: 0 },
    rentPrice: { type: Number, default: 0 },
    description: { type: String, required: true },
    propertyAge: { type: Number, required: true },
    area: { type: Number, required: true },
    listingType: { type: String, enum: ["sell", "rent"], required: true },
    propertyType: { type: String, required: true },
    address: {
      house: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    features: {
      parking: { type: Boolean, default: false },
      water: { type: Boolean, default: false },
      lift: { type: Boolean, default: false },
      electricity: { type: Boolean, default: false },
      swimmingPool: { type: Boolean, default: false },
      modularKitchen: { type: Boolean, default: false },
      balcony: { type: Boolean, default: false },
      park: { type: Boolean, default: false },
      furnished: { type: Boolean, default: false },
      meetingRoom: { type: Boolean, default: false },
      meal: { type: Boolean, default: false },
      ac: { type: Boolean, default: false },
      wifi: { type: Boolean, default: false },
      boundaryWall: { type: Boolean, default: false },
      gym: { type: Boolean, default: false },
    },
    images: [{ type: String }], // To store image URLs
    video: { type: String }, // URL of video if any
  },
  { timestamps: true }
);
export default mongoose.model("Property", propertySchema);
