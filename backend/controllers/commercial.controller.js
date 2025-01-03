import CommercialProperty from "../models/commercial.model.js";
import User from "../models/user.model.js";

// 📌 Add a new Commercial Property
export const addCommercialProperty = async (req, res) => {
  try {
    const {
      name,
      price,
      priceType,
      area,
      floor,
      totalFloors,
      propertyType,
      transactionType,
      furnishedStatus,
      utilities,
      features,
      address,
      description,
      availableFrom,
      userEmail,
    } = req.body;

    const images = req.files ? req.files.map((file) => file.path) : [];

    const newCommercialProperty = new CommercialProperty({
      name,
      price,
      priceType,
      area,
      floor,
      totalFloors,
      propertyType,
      transactionType,
      furnishedStatus,
      utilities,
      features,
      address,
      description,
      availableFrom,
      userEmail,
      images,
    });

    const property = await newCommercialProperty.save();
    console.log("New Commercial Property", property);

    res
      .status(200)
      .json({ message: "Commercial Property added successfully", property });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding Commercial Property" });
  }
};

// 📌 List Commercial Properties with filters and pagination
export const listCommercialProperties = async (req, res) => {
  try {
    const {
      name,
      price,
      priceType,
      propertyType,
      area,
      transactionType,
      furnishedStatus,
      utilities,
      features,
      page = 1,
      limit = 5,
    } = req.query;

    const orFilters = [];

    if (name) orFilters.push({ name: { $regex: name, $options: "i" } });
    if (price) orFilters.push({ price: { $lte: Number(price) } });
    if (priceType) orFilters.push({ priceType });
    if (propertyType) orFilters.push({ propertyType });
    if (area) orFilters.push({ area: { $lte: Number(area) } });
    if (transactionType) orFilters.push({ transactionType });
    if (furnishedStatus) orFilters.push({ furnishedStatus });

    if (features) {
      const featureArray = features.split(",");
      orFilters.push({ "features": { $in: featureArray } });
    }

    if (utilities) {
      const utilityArray = utilities.split(",");
      orFilters.push({ "utilities": { $in: utilityArray } });
    }

    const filters = orFilters.length > 0 ? { $or: orFilters } : {};

    const skip = (Number(page) - 1) * Number(limit);

    const properties = await CommercialProperty.find(filters)
      .skip(skip)
      .limit(Number(limit));

    const total = await CommercialProperty.countDocuments(filters);

    res.status(200).json({ properties, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch Commercial Properties", error });
  }
};

// 📌 Get Commercial Property by ID
export const getCommercialPropertyById = async (req, res) => {
  try {
    const property = await CommercialProperty.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Commercial Property not found" });
    }
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 Get Latest Commercial Properties
export const latestCommercialProperties = async (req, res) => {
  try {
    const properties = await CommercialProperty.find()
      .sort({ createdAt: -1 })
      .limit(5);

    if (properties.length === 0) {
      return res.status(404).json({ message: "No Commercial Properties found" });
    }

    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 Get User Profile and their Commercial Properties
export const getUserProfileAndCommercialProperties = async (req, res) => {
  const userId = req.userId; 
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const properties = await CommercialProperty.find({ userId: userId });

    res.json({ user, properties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
