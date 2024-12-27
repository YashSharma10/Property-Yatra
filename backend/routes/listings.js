const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

// Add a new listing
router.post("/listings", async (req, res) => {
  try {
    let newListing = new Listing({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      location: req.body.location,
      country: req.body.country,
      image: {
        filename: req.body.image.filename,
        url: req.body.image.url,
      },
    });

    await newListing.save();
    res.status(201).send("Listing created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating listing");
  }
});

// Get all listings
router.get("/getListings", async (req, res) => {
  try {
    let listings = await Listing.find({});
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching listings");
  }
});

// Get a single listing by ID
router.get("/listings/:id", async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).send("Listing not found");
    res.json(listing);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching listing");
  }
});

// Delete a listing by ID
router.delete("/listings/:id", async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.send("Listing deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting listing");
  }
});

// Update a listing by ID
router.put("/listings/:id", async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).send("Listing not found");

    listing.title = req.body.title || listing.title;
    await listing.save();
    res.send("Listing updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating listing");
  }
});

module.exports = router;
