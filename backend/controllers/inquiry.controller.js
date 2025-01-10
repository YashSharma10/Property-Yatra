import Inquiry from "../models/inquiry.model.js";

export const addInquiry = async (req, res) => {
  try {
    const newInquiry = new Inquiry({
      user: req.user,
      property: req.params,
    });
    const d = await newInquiry.save();
    return res.status(201).json({ message: d });
  } catch (error) {
    req.status(500).json({ message: error });
  }
};
