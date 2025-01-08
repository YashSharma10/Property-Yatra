import Property from "../models/property.model.js";
import User from "../models/user.model.js";

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
    const {
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
    } = req.body;
    console.log("Name", req.body);

    const imageUrls = req.files?.map((file) => file.path) || [];
    const userID = req.user;
    const newProperty = new Property({
      name,
      sellPrice,
      rentPrice,
      description,
      propertyAge,
      area,
      listingType,
      propertyType,
      address: JSON.parse(address),
      features: JSON.parse(features),
      images: imageUrls,
      postedBy: userID,
    });

    const property = await newProperty.save();
    const user = await User.findByIdAndUpdate(
      userID,
      {
        $push: {
          postedProperties: property._id,
        },
      },
      { new: true, runValidators: true }
    );
    
    return res
      .status(201)
      .json({ message: "Property created successfully", data: property });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
