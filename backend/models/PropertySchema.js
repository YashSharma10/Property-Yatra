const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['Flat', 'Villa', 'Independent House', 'Penthouse'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  configuration: {
    type: String,
    enum: ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK'],
    required: true
  },
  propertyType: {
    type: String,
    enum: ['Furnished', 'Semi-Furnished', 'Unfurnished'],
    required: true
  },
  utilities: {
    water: { type: Boolean, default: false },
    electricity: { type: Boolean, default: false },
    gas: { type: Boolean, default: false }
  },
  area: {
    type: Number,
    required: true
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  propertyAge: {
    type: Number,
    required: true
  },
  transactionType: {
    type: String,
    enum: ['Resale', 'New Booking'],
    required: true
  },
  features: {
    parking: { type: Boolean, default: false },
    lift: { type: Boolean, default: false },
    swimmingPool: { type: Boolean, default: false },
    modularKitchen: { type: Boolean, default: false },
    balcony: { type: Boolean, default: false },
    park: { type: Boolean, default: false }
  },
  description: {
    type: String,
    trim: true
  },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true }
    }
  ],
  userEmail: {
    type: String,
    required: true,
    trim: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;
