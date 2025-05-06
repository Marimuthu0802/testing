const Apartment = require("../model/Apartment");

// ✅ Get All Apartments
exports.getApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.json(apartments);
  } catch (error) {
    console.error("Error fetching apartments:", error);
    res.status(500).json({ error: "Failed to fetch apartments" });
  }
};

// ✅ Add New Apartment
exports.addApartment = async (req, res) => {
  try {
    const { apartmentName, price, location, BHK, projectStatus } = req.body;
    const image = req.file ? req.file.filename : null; // Ensure image upload

    const newApartment = new Apartment({ apartmentName, price, location, BHK, projectStatus, image });
    await newApartment.save();

    res.status(201).json({ message: "Apartment added successfully!", newApartment });
  } catch (error) {
    console.error("Error adding apartment:", error);
    res.status(500).json({ error: "Failed to add apartment" });
  }
};

// ✅ Delete Apartment
exports.deleteApartment = async (req, res) => {
  try {
    const deletedApartment = await Apartment.findByIdAndDelete(req.params.id);

    if (!deletedApartment) {
      return res.status(404).json({ error: "Apartment not found" });
    }

    res.json({ message: "Apartment deleted successfully!" });
  } catch (error) {
    console.error("Error deleting apartment:", error);
    res.status(500).json({ error: "Failed to delete apartment" });
  }
};

// ✅ Update Apartment
exports.updateApartment = async (req, res) => {
  try {
    const { apartmentName, price, location, BHK, projectStatus } = req.body;
    const updatedData = { apartmentName, price, location, BHK, projectStatus };

    if (req.file) {
      updatedData.image = req.file.filename; // Update image only if a new file is uploaded
    }

    const updatedApartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedApartment) {
      return res.status(404).json({ error: "Apartment not found" });
    }

    res.json({ message: "Apartment updated successfully!", updatedApartment });
  } catch (error) {
    console.error("Error updating apartment:", error);
    res.status(500).json({ error: "Failed to update apartment" });
  }
};