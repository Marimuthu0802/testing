const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  project: { type: String, required: true},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Enquiry", enquirySchema);
