import mongoose from "mongoose";

const inquirySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry",inquirySchema);
export default Inquiry;