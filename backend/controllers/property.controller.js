import Property from "../models/property.model.js";
import User from "../models/user.model.js";

// Add a new property
export const addProperty = async (req, res) => {
  console.log(req.body);

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

    // File paths will be added after Multer processes the images
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
    console.log("New P",p);
    
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

    // Add individual filters to the `$or` array if provided
    if (name) orFilters.push({ name: { $regex: name, $options: 'i' } });
    if (type) orFilters.push({ type });
    if (price) orFilters.push({ price: { $lte: Number(price) } });
    if (propertyType) orFilters.push({ propertyType });
    if (area) orFilters.push({ area: { $regex: area, $options: 'i' } });
    if (transactionType) orFilters.push({ transactionType });

    if (features) {
      const featureArray = features.split(',');
      orFilters.push({ features: { $in: featureArray } });
    }

    if (utilities) {
      const utilityArray = utilities.split(',');
      orFilters.push({ utilities: { $in: utilityArray } });
    }

    const filters = orFilters.length > 0 ? { $or: orFilters } : {};

    const skip = (Number(page) - 1) * Number(limit);

    const properties = await Property.find(filters)
      .skip(skip)
      .limit(Number(limit));

    const total = await Property.countDocuments(filters);

    res.status(200).json({ properties, total });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch properties', error });
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

export const getUserProfileAndProperties = async (req, res) => {
  const userId = req.userId; // Get userId from token (this will be set in a middleware)

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch properties added by the user
    const properties = await Property.find({ userId: userId });

    res.json({ user, properties });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};