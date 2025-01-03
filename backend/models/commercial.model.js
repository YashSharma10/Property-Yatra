import mongoose from "mongoose";

const commercialPropertySchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    priceType: String, // e.g., For Sale, For Rent, Lease
    area: Number,
    floor: Number,
    totalFloors: Number,
    propertyType: String, // e.g., Office Space, Retail Shop, Warehouse
    transactionType: String, // e.g., Sale, Lease
    furnishedStatus: String,
    utilities: {
      water: Boolean,
      electricity: Boolean,
      gas: Boolean,
      sewage: Boolean,
    },
    features: {
      parking: Boolean,
      lift: Boolean,
      security: Boolean,
      fireSafety: Boolean,
      conferenceRoom: Boolean,
      cafeteria: Boolean,
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },
    description: String,
    images: [String],
    availableFrom: Date, // Availability date
    userEmail: String, // Email of the owner/manager
  },
  { timestamps: true }
);

export default mongoose.model("CommercialProperty", commercialPropertySchema);
