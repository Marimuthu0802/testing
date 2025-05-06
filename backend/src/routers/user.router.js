const { Router } = require("express");
const upload = require("../middleware/upload");
const { saveContact } = require("../controller/contactController");
const Apartment = require("../model/Apartment"); // ✅ Import Apartment model
const { createEnquiry } = require("../controller/enquiry.controller");
const { getContactCounts } = require("../controller/dashboard controller");
const { getPropertyDashboard } = require("../controller/propertyDashController");
const frontendUrls = process.env.FRONTEND_URL.split(",");

const router = Router();



// ✅ Apartment Routes (CRUD)

// 🔹 Add Apartment (POST)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    console.log("📦 Request Body:", req.body);
    console.log("📸 Uploaded File:", req.file);

    if (!req.file) {
      console.error("❌ No file uploaded!");
      return res.status(400).json({ error: "All fields are required!" });
    }

    let { apartmentName, price, location, BHK, projectStatus, propertyType } =
      req.body;

    if (
      !apartmentName ||
      !price ||
      !location ||
      !BHK ||
      !projectStatus ||
      !propertyType
    ) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const image = req.file.filename;

    const newApartment = new Apartment({
      apartmentName,
      price,
      location,
      BHK,
      projectStatus,
      propertyType,
      image,
    });

    await newApartment.save();
    console.log("✅ Apartment added successfully!");
    res.json({ message: "Apartment added successfully!" });
  } catch (error) {
    console.error("🔥 Error adding apartment:", error);
    res
      .status(500)
      .json({ error: "Failed to add apartment", details: error.message });
  }
});

// 🔹 Get All Apartments (GET)
router.get("/view", async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch apartments" });
  }
});

// 🔹 Delete Apartment (DELETE)
router.delete("/apartments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Apartment.findByIdAndDelete(id);
    res.json({ message: "Apartment deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete apartment" });
  }
});

// 🔹 Update Apartment (PUT)
router.put("/apartments/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    let { apartmentName, price, location, BHK, projectStatus, propertyType } =
      req.body;

    const updatedData = {};

    if (apartmentName?.trim() !== "") updatedData.apartmentName = apartmentName;
if (price?.trim() !== "") updatedData.price = price;
if (location?.trim() !== "") updatedData.location = location;
if (BHK?.trim() !== "") updatedData.BHK = BHK;
if (projectStatus?.trim() !== "") updatedData.projectStatus = projectStatus;
if (propertyType?.trim() !== "") updatedData.propertyType = propertyType;

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const existingApartment = await Apartment.findById(id);
    if (!existingApartment) {
      return res.status(404).json({ error: "Apartment not found" });
    }

    console.log("updated data", updatedData);

    const updatedApartment = await Apartment.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    console.log(updatedApartment);

    res.json({ message: "Apartment updated successfully!", updatedApartment });
  } catch (error) {
    console.error("🔥 Error updating apartment:", error);
    res.status(500).json({ error: "Failed to update apartment" });
  }
});

// ✅ Contact Form Route
router.post("/contactus", saveContact);

//dashboard
router.get("/dashboard", getContactCounts);

//property Dashboard
router.get("/property-status-count", getPropertyDashboard);

// ✅ Enquiry Form
router.post("/enquiry", createEnquiry);


// ✅ Logout Route (Fixed for Express 4+)
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => res.redirect("/"));
  });
});


module.exports = router;