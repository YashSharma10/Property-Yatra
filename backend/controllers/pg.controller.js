import PG from "../models/pg.model.js";
import User from "../models/user.model.js";

// 📌 Add a new PG
export const addPG = async (req, res) => {
  try {
    const {
      name,
      pricePerMonth,
      securityDeposit,
      accommodationType,
      occupancy,
      foodIncluded,
      amenities,
      utilities,
      address,
      description,
      rules,
      availableFrom,
      userEmail,
    } = req.body;

    const images = req.files ? req.files.map((file) => file.path) : [];

    const newPG = new PG({
      name,
      pricePerMonth,
      securityDeposit,
      accommodationType,
      occupancy,
      foodIncluded,
      amenities,
      utilities,
      address,
      description,
      rules,
      availableFrom,
      userEmail,
      images,
    });

    const pg = await newPG.save();
    console.log("New PG", pg);

    res.status(200).json({ message: "PG added successfully", pg: newPG });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding PG" });
  }
};

// 📌 List PGs with filters and pagination
export const listPGs = async (req, res) => {
  try {
    const {
      name,
      pricePerMonth,
      accommodationType,
      occupancy,
      amenities,
      utilities,
      page = 1,
      limit = 5,
    } = req.query;

    const orFilters = [];

    if (name) orFilters.push({ name: { $regex: name, $options: "i" } });
    if (pricePerMonth)
      orFilters.push({ pricePerMonth: { $lte: Number(pricePerMonth) } });
    if (accommodationType) orFilters.push({ accommodationType });
    if (occupancy) orFilters.push({ occupancy });

    if (amenities) {
      const amenityArray = amenities.split(",");
      orFilters.push({ amenities: { $in: amenityArray } });
    }

    if (utilities) {
      const utilityArray = utilities.split(",");
      orFilters.push({ utilities: { $in: utilityArray } });
    }

    const filters = orFilters.length > 0 ? { $or: orFilters } : {};

    const skip = (Number(page) - 1) * Number(limit);

    const pgs = await PG.find(filters).skip(skip).limit(Number(limit));

    const total = await PG.countDocuments(filters);

    res.status(200).json({ pgs, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch PGs", error });
  }
};

// 📌 Get PG by ID
export const getPGById = async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);
    if (!pg) {
      return res.status(404).json({ message: "PG not found" });
    }
    res.json(pg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 Get latest PGs
export const latestPGs = async (req, res) => {
  try {
    const pgs = await PG.find().sort({ createdAt: -1 }).limit(5);

    if (pgs.length === 0) {
      return res.status(404).json({ message: "No PGs found" });
    }

    res.json(pgs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 Get user profile and their PGs
export const getUserProfileAndPGs = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const pgs = await PG.find({ userId: userId });

    res.json({ user, pgs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
