import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  configuration: String,
  propertyType: String,
  utilities: {
    water: Boolean,
    electricity: Boolean,
    gas: Boolean
  },
  area: Number,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: String
  },
  propertyAge: Number,
  transactionType: String,
  features: {
    parking: Boolean,
    lift: Boolean,
    swimmingPool: Boolean,
    modularKitchen: Boolean,
    balcony: Boolean,
    park: Boolean
  },
  description: String,
  images: [String],  // Store file paths of images
  userEmail: String
}, { timestamps: true });

export default mongoose.model('Property', propertySchema);
