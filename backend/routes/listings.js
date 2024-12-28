const express = require("express");
const router = express.Router();
const Property = require("../models/PropertySchema"); // Ensure the correct path to your model

// -----------------------------
// 🚀 CREATE a new Property
// -----------------------------
router.post("/properties", async (req, res) => {
  try {
    let newProperty = new Property({
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      configuration: req.body.configuration,
      propertyType: req.body.propertyType,
      utilities: {
        water: req.body.utilities?.water || false,
        electricity: req.body.utilities?.electricity || false,
        gas: req.body.utilities?.gas || false,
      },
      area: req.body.area,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        state: req.body.address.state,
        country: req.body.address.country,
        pincode: req.body.address.pincode,
      },
      propertyAge: req.body.propertyAge,
      transactionType: req.body.transactionType,
      features: {
        parking: req.body.features?.parking || false,
        lift: req.body.features?.lift || false,
        swimmingPool: req.body.features?.swimmingPool || false,
        modularKitchen: req.body.features?.modularKitchen || false,
        balcony: req.body.features?.balcony || false,
        park: req.body.features?.park || false,
      },
      description: req.body.description,
      images: req.body.images || [],
      userEmail: req.body.userEmail,
    });

    await newProperty.save();
    res.status(201).send("Property created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating property");
  }
});

// -----------------------------
// 📚 READ all Properties
// -----------------------------
router.get("/properties", async (req, res) => {
  try {
    let properties = await Property.find({});
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching properties");
  }
});

// -----------------------------
// 🔍 READ a single Property by ID
// -----------------------------
router.get("/properties/:id", async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);
    if (!property) return res.status(404).send("Property not found");
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching property");
  }
});

// -----------------------------
// 📝 UPDATE a Property by ID
// -----------------------------
router.put("/properties/:id", async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);
    if (!property) return res.status(404).send("Property not found");

    // Update fields if provided in the request body
    property.name = req.body.name || property.name;
    property.type = req.body.type || property.type;
    property.price = req.body.price || property.price;
    property.configuration = req.body.configuration || property.configuration;
    property.propertyType = req.body.propertyType || property.propertyType;
    property.utilities = req.body.utilities || property.utilities;
    property.area = req.body.area || property.area;
    property.address = req.body.address || property.address;
    property.propertyAge = req.body.propertyAge || property.propertyAge;
    property.transactionType = req.body.transactionType || property.transactionType;
    property.features = req.body.features || property.features;
    property.description = req.body.description || property.description;
    property.images = req.body.images || property.images;
    property.userEmail = req.body.userEmail || property.userEmail;

    await property.save();
    res.send("Property updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating property");
  }
});

// -----------------------------
// 🗑️ DELETE a Property by ID
// -----------------------------
router.delete("/properties/:id", async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.send("Property deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting property");
  }
});

// -----------------------------
// 🔎 SEARCH Properties by City
// -----------------------------
router.get("/properties/search/:city", async (req, res) => {
  try {
    let properties = await Property.find({ "address.city": req.params.city });
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error searching properties by city");
  }
});

module.exports = router;
