import User from "../models/user.model.js";

// 📝 **Signup Controller**
export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (role && !["user", "admin", "agent"].includes(role)) {
    return res.status(400).json({ message: "Invalid role specified" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // setTokenCookie(res, token);

    res
      .status(201)
      .cookie("token", token, {
        maxage: 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "User created successfully",
        token,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log(error);
  }
};

// 📝 **Login Controller**
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // setTokenCookie(res, token);

    res
      .status(200)
      .cookie("token", token, {
        maxage: 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Login successful",
        token,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📝 **Logout Controller**
export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

// 🛡️ **Role Middleware**
export const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

// 📝 **Add Liked Property**
export const addlikedProperty = async (req, res) => {
  const { propertyType, propertyId } = req.body;
  try {
    const likedPropertiesData = await User.findByIdAndUpdate(
      req.user,
      {
        $push: {
          likedProperties: { propertyType, propertyId },
        },
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({ likedPropertiesData });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// 📝 **Get All Liked Properties (User only)**
export const getAllLikedProperty = async (req, res) => {
  try {
    const likedPropertyData = await User.findById(req.user)
      .populate({
        path: "likedProperties",
      })
      .select("-password -name -email -postedProperties -_id");
    return res
      .status(200)
      .json({ message: "Liked properties", likedPropertyData });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// 📝 **Admin: Get All Users (Admin only)**
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📝 **Agent: Get Assigned Properties (Agent only)**
export const getAgentProperties = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("postedProperties");
    res.status(200).json({ postedProperties: user.postedProperties });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
