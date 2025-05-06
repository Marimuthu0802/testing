const Enquiry = require("../model/Enquiry");

exports.createEnquiry = async (req, res) => {
  try {
    const { name, mobile, email, project } = req.body;
    if (!name || !mobile || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newEnquiry = new Enquiry({ name, mobile, email, project });
    await newEnquiry.save();

    res.status(201).json({ message: "Enquiry submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
