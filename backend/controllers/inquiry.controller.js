import Inquiry from "../models/inquiry.model.js";
import Property from "../models/property.model.js";
import User from "../models/user.model.js";

export const addInquiry = async (req, res) => {
  const propertyId = req.params.id;
  const userId = req.user;
  console.log("property", propertyId);

  try {
    const findProperty = await Property.findOne({ _id: propertyId });
    if (!findProperty)
      return res.status(404).json({ message: "Property not found" });

    const updateUserContactedProperties = await User.findByIdAndUpdate(userId, {
      $push: {
        contactProperties: propertyId,
      },
    });
    const findPropertiesForInquiry = await Inquiry.findOneAndUpdate(
      { _id: propertyId },
      {
        $push: { user: userId },
      },
      {
        upsert: true,
        new: true,
      }
    );
    // const newInquiry = new Inquiry({
    //   user: req.user,
    //   property: req.params,
    // });
    // const d = await newInquiry.save();
    return res
      .status(201)
      .json({ message: "Inquiry created", findPropertiesForInquiry });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// const property = await Property.findByIdAndUpdate(
//   id,
//   {
//     $push: { views: userId },
//   },
//   { new: true }
// );
