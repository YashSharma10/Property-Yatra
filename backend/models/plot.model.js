import mongoose from "mongoose";

const plotSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    area: Number,
    dimensions: {
      length: Number,
      width: Number,
    },
    plotType: String, // e.g., Residential, Commercial, Agricultural
    transactionType: String, // e.g., Sale, Resale
    utilities: {
      // Available utilities
      water: Boolean,
      electricity: Boolean,
      gas: Boolean,
      sewage: Boolean,
    },
    features: {
      // Plot-specific features
      gatedCommunity: Boolean,
      roadFacing: Boolean,
      cornerPlot: Boolean,
      parkFacing: Boolean,
    },
    address: {
      // Location details
      street: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },
    description: String, // Additional plot details
    images: [String], // Image URLs or file paths
    userEmail: String, // Email of the user posting the plot
  },
  { timestamps: true }
);

export default mongoose.model("Plot", plotSchema);
