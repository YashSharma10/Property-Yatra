import Property from "../models/property.model.js";
import User from "../models/user.model.js";

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
    });

    const p = await newProperty.save();
    console.log("New P", p);

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
    res.status(500).json({ message: "Server error" });
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
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const properties = await Property.find({ userId: userId });

    res.json({ user, properties });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
