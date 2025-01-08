import Property from "../models/property.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
// Add a new property
export const addProperty = async (req, res) => {
  try {
    const {
      name,
      type,
      price,
      configuration,
      propertyType,
      utilities,
      area,
      address,
      propertyAge,
      transactionType,
      features,
      description,
      userEmail,
    } = req.body;

    const images = req.files ? req.files.map((file) => file.path) : [];
    const userID = req.user;
    const newProperty = new Property({
      name,
      type,
      price,
      configuration,
      propertyType,
      utilities,
      area,
      address,
      propertyAge,
      transactionType,
      features,
      description,
      userEmail,
      images,
      postedBy: userID,
    });

    // console.log("New P", newProperty);
    const p = await newProperty.save();
    const user = await User.findOne(userID);
    console.log(user);

    user.postedProperties.push(newProperty._id);
    await user.save();
    res
      .status(200)
      .json({ message: "Property added successfully", property: newProperty });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding property" });
  }
};

export const listProperties = async (req, res) => {
  try {
    const {
      name,
      type,
      price,
      propertyType,
      area,
      transactionType,
      features,
      utilities,
      page = 1,
      limit = 5,
    } = req.query;

    const orFilters = [];

    if (name) orFilters.push({ name: { $regex: name, $options: "i" } });
    if (type) orFilters.push({ type });
    if (price) orFilters.push({ price: { $gte: Number(price) } });
    if (propertyType) orFilters.push({ propertyType });

    if (features) {
      const featureArray = features.split(",");
      orFilters.push({ features: { $in: featureArray } });
    }

    const filters = orFilters.length > 0 ? { $or: orFilters } : {};
    console.log(filters);

    const skip = (Number(page) - 1) * Number(limit);

    const properties = await Property.find(filters)
      .skip(skip)
      .limit(Number(limit));

    const total = await Property.countDocuments(filters);

    res.status(200).json({ properties, total });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch properties", error });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error id" });
  }
};

export const latestProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 }).limit(5);

    if (properties.length === 0) {
      return res.status(404).json({ message: "No properties found" });
    }

    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserProfileAndProperties = async (req, res) => {
  try {
    const userID = req.user;
    console.log("UserId", userID);
    const postedProperties = await User.findById(userID)
      .select("-password")
      .populate({ path: "postedProperties" });

    res.status(200).json(postedProperties);
  } catch (error) {
    res.status(500).json({ message: "Server error profil" });
  }
};


export const createProperty = async (req, res) => {
  try {
    const { name, sellPrice, rentPrice, description, propertyAge, area, listingType, propertyType, address, features, images, video } = req.body;

    // Upload images to cloudinary
    const imageUrls = [];
    if (images) {
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i].path, { folder: "properties" });
        imageUrls.push(result.secure_url);
      }
    }

    // Upload video to cloudinary
    let videoUrl = "";
    if (video) {
      const videoResult = await cloudinary.uploader.upload(video.path, { resource_type: "video", folder: "properties" });
      videoUrl = videoResult.secure_url;
    }

    // Create a new property document
    const newProperty = new Property({
      name,
      sellPrice,
      rentPrice,
      description,
      propertyAge,
      area,
      listingType,
      propertyType,
      address,
      features,
      images: imageUrls,
      video: videoUrl,
    });

    // Save the property to the database
    await newProperty.save();
    return res.status(201).json({ message: "Property created successfully", data: newProperty });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

