import Plot from "../models/plot.model.js";
import User from "../models/user.model.js";

// 📌 Add a new Plot
export const addPlot = async (req, res) => {
  try {
    const {
      name,
      price,
      area,
      dimensions,
      plotType,
      transactionType,
      utilities,
      features,
      address,
      description,
      userEmail,
    } = req.body;

    const images = req.files ? req.files.map((file) => file.path) : [];

    const newPlot = new Plot({
      name,
      price,
      area,
      dimensions,
      plotType,
      transactionType,
      utilities,
      features,
      address,
      description,
      userEmail,
      images,
    });

    const plot = await newPlot.save();
    console.log("New Plot Added:", plot);

    res
      .status(200)
      .json({ message: "Plot added successfully", plot });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding Plot" });
  }
};

// 📌 List Plots with filters and pagination
export const listPlots = async (req, res) => {
  try {
    const {
      name,
      price,
      area,
      plotType,
      transactionType,
      utilities,
      features,
      page = 1,
      limit = 5,
    } = req.query;

    const orFilters = [];

    if (name) orFilters.push({ name: { $regex: name, $options: "i" } });
    if (price) orFilters.push({ price: { $lte: Number(price) } });
    if (area) orFilters.push({ area: { $lte: Number(area) } });
    if (plotType) orFilters.push({ plotType });
    if (transactionType) orFilters.push({ transactionType });

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

    const plots = await Plot.find(filters)
      .skip(skip)
      .limit(Number(limit));

    const total = await Plot.countDocuments(filters);

    res.status(200).json({ plots, total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch Plots", error });
  }
};

// 📌 Get Plot by ID
export const getPlotById = async (req, res) => {
  try {
    const plot = await Plot.findById(req.params.id);
    if (!plot) {
      return res.status(404).json({ message: "Plot not found" });
    }
    res.json(plot);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 Get Latest Plots
export const latestPlots = async (req, res) => {
  try {
    const plots = await Plot.find()
      .sort({ createdAt: -1 })
      .limit(5);

    if (plots.length === 0) {
      return res.status(404).json({ message: "No Plots found" });
    }

    res.json(plots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// 📌 Get User Profile and their Plots
export const getUserProfileAndPlots = async (req, res) => {
  const userId = req.userId; 
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const plots = await Plot.find({ userId: userId });

    res.json({ user, plots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
