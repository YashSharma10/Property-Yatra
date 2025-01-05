import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    postedProperties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    likedProperties: [
      {
        propertyType: {
          type: String,
          enum: ["CommercialProperty", "PG", "Plot", "Property"],
          // required: true,
        },
        propertyId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "likedProperties.propertyType",
          // required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
