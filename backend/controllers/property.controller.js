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
  console.log("Filters", req.query);
  
  try {
    const {
      area,
      features,
      listingType,
      sellPrice,
      propertyAge,
      rentPrice,
      propertyType,
      searchLocation,
      page = 1,
      limit = 5,
    } = req.query;

    const orFilters = [];


    if ((!propertyType === "All") && propertyType) {
      orFilters.push({ propertyType: { $regex: propertyType, $options: "i" } });
    }
    if (listingType) {
      orFilters.push({ listingType: { $regex: listingType, $options: "i" } });
    }

    if (rentPrice) {
      orFilters.push({ rentPrice: { $gte: Number(rentPrice) } });
    }
    if (sellPrice) {
      orFilters.push({ sellPrice: { $gte: Number(sellPrice) } });
    }

    if (propertyAge) {
      orFilters.push({ propertyAge: { $regex: propertyAge, $options: "i" } });
    }
    if (area) {
      orFilters.push({ area: { $regex: area, $options: "i" } });
    }

    if (searchLocation) {
      orFilters.push({
        "address.city": { $regex: searchLocation, $options: "i" },
      });
    }

    if (features) {
      Object.entries(JSON.parse(features)).forEach(
        ([featureKey, featureValue]) => {
          if (featureValue === true) {
            orFilters.push({ [`features.${featureKey}`]: true });
          }
        }
      );
    }

    const filters = orFilters.length > 0 ? { $and: orFilters } : {};

    const skip = (Number(page) - 1) * Number(limit);

    const properties = await Property.find(filters)
      .skip(skip)
      .limit(Number(limit));

    const total = await Property.countDocuments(filters);

    res.status(200).json({ properties, total });
  } catch (error) {
    console.error("Error fetching properties:", error);
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
      .populate([{ path: "postedProperties" }, { path: "likedProperties" }]);

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
      views:[userID]
    });

    console.log("New Property",newProperty);
    
    const property = await newProperty.save();
    console.log("Property", property);
    
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

export const addView = async (req, res) => {
  try {
    
    const { id } = req.params;
    const userId = req.user;
    console.log("Id",id,"user",userId);

    if (!id || !userId) {
      return res
        .status(400)
        .json({ message: "Missing property ID or user info" });
    }

    const userInArrayOfProperty = await Property.findById(id)
      .populate({
        path: "views",
      })
      .select("views");

    if (
      !userInArrayOfProperty.views.some(
        (item) => item._id.toString() === userId.toString()
      )
    ) {
      console.log("Includes true");
      const property = await Property.findByIdAndUpdate(
        id,
        {
          $push: { views: userId },
        },
        { new: true }
      );

      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
    }

    return res.status(200).json({ message: "Viewed successfully" });
  } catch (error) {
    console.error("Error adding view:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
