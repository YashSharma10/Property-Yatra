import mongoose from "mongoose";

const pgSchema = new mongoose.Schema(
  {
    name: String,
    pricePerMonth: Number,
    securityDeposit: Number,
    accommodationType: String, // e.g., Single Room, Shared Room, Dormitory
    occupancy: String, // e.g., Male, Female, Unisex
    foodIncluded: Boolean,
    amenities: {
      // Available facilities
      wifi: Boolean,
      laundry: Boolean,
      airConditioning: Boolean,
      housekeeping: Boolean,
      parking: Boolean,
      kitchenAccess: Boolean,
    },
    utilities: {
      water: Boolean,
      electricity: Boolean,
      gas: Boolean,
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
    rules: [String], // List of PG rules (e.g., No Smoking, No Pets)
    availableFrom: Date, // Availability date
    userEmail: String, // Email of the owner/manager
  },
  { timestamps: true }
);

export default mongoose.model("PG", pgSchema);
