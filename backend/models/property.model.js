import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    price: Number,
    configuration: String,
    propertyType: {
      type: String,
      enum: ["Residential", "Commercial", "PG", "Plot"],
      required: true,
    },
    utilities: {
      water: Boolean,
      electricity: Boolean,
      gas: Boolean,
    },
    area: Number,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },
    propertyAge: Number,
    transactionType: String,
    features: {
      parking: Boolean,
      lift: Boolean,
      swimmingPool: Boolean,
      modularKitchen: Boolean,
      balcony: Boolean,
      park: Boolean,
    },
    description: String,
    images: [String],
    userEmail: String,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    commercialDetails: {
      businessType: String,
      floorNumber: Number,
      furnished: Boolean,
      meetingRooms: Number,
    },

    pgDetails: {
      foodIncluded: Boolean,
      acAvailable: Boolean,
      wifiAvailable: Boolean,
      sharingType: String,
    },

    plotDetails: {
      plotFacing: String,
      boundaryWall: Boolean,
      landApproved: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
