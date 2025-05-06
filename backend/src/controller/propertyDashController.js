const Apartment = require("../model/Apartment");

// Get total count and date-based count
exports.getPropertyDashboard = async (req, res) => {
  try {
    // const { location } = req.query; // Get city location from query params

    // if (!location) {
    //   return res.status(400).json({ error: "Location is required" });
    // }

    const locations = ["Chennai", "Bengaluru", "Coimbatore", "Hyderabad"];
    const statuses = ["Ready to Move", "Under Construction", "Occupied"];

    const locationStatusStats = await Apartment.aggregate([
      { $match: { location: { $in: locations }, projectStatus: { $in: statuses } } }, // Filter by location and status
      {
        $group: {
          _id: { location: "$location", status: "$projectStatus" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.location": 1 } }, // Sort by location
    ]);

    // Convert aggregation result into structured response
    const formattedData = locations.map((location) => ({
      location,
      "Ready to Move": 0,
      "Under Construction": 0,
      "Occupied": 0,
      ...locationStatusStats
        .filter((item) => item._id.location === location)
        .reduce((acc, item) => ({ ...acc, [item._id.status]: item.count }), {}),
    }));

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching project status count:", error);
    res.status(500).json({ error: "Internal Server Error" });
    // res.status(500).json({ error: error.message });
  }
};
