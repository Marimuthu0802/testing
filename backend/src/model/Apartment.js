
const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  apartmentName: { type: String, required: true },
  price: { type: String, required: true },
  location: { type: String, required: true },
  BHK: { type: String, required: true },
  projectStatus: { type: String, required: true },
  propertyType: { type: String, required: true }, // ✅ Added propertyType
  image: { type: String, required: true }, // Store filename
});

module.exports = mongoose.model("Apartment", apartmentSchema);