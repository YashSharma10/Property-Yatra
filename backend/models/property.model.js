import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: String,
    sellPrice: Number,
    rentPrice: Number,
    description: String,
    images: [String],
    userEmail: String,
    propertyAge: Number,
    area: Number,
    // configuration: String,
    listingType: {
      type: String,
      enum: ["sell", "rent"]
    },
    propertyType: {
      type: String,
      enum: ["Residential", "Commercial", "PG", "Plot", "Flat"],
      required: true,
    },
  
    // utilities: {
    //   water: Boolean,
    //   electricity: Boolean,
    //   gas: Boolean,
    // },
    address: {
      house:String,
      city: String,
      pincode: String,
      state: String,
      // country: String,
    },
    // transactionType: String,
    features: {
      parking: Boolean,
      lift: Boolean,
      swimmingPool: Boolean,
      modularKitchen: Boolean,
      balcony: Boolean,
      park: Boolean,
      businessType: String,
      floorNumber: Number,
      furnished: Boolean,
      meetingRooms: Number,
      foodIncluded: Boolean,
      acAvailable: Boolean,
      wifiAvailable: Boolean,
      sharingType: String,
      plotFacing: String,
      boundaryWall: Boolean,
      landApproved: Boolean,
    },
 
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // commercialDetails: {
    //   businessType: String,
    //   floorNumber: Number,
    //   furnished: Boolean,
    //   meetingRooms: Number,
    // },

    // pgDetails: {
    //   foodIncluded: Boolean,
    //   acAvailable: Boolean,
    //   wifiAvailable: Boolean,
    //   sharingType: String,
    // },

    // plotDetails: {
    //   plotFacing: String,
    //   boundaryWall: Boolean,
    //   landApproved: Boolean,
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);
