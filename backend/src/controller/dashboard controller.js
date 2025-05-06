const Contact = require("../model/Contact");
const Enquiry = require("../model/Enquiry");

// Get total count and date-based count
exports.getContactCounts = async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const allContacts = await Contact.find(); // Fetch all contacts
    const totalEnquiry = await Enquiry.countDocuments();
    const allEnquiry = await Enquiry.find(); //Fetch all Enquiry

    let filteredContacts = [];
    let filteredEnquiry = [];

    let dateCount = 0;
    let dateEnquiryCount = 0;
    if (req.query.date) {
      const startDate = new Date(req.query.date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1); // To cover the whole day

      filteredContacts = await Contact.find({
        createdAt: { $gte: startDate, $lt: endDate },
      });

      filteredEnquiry = await Enquiry.find({
        createdAt: { $gte: startDate, $lt: endDate },
      });

      dateCount = filteredContacts.length;
      dateEnquiryCount = filteredEnquiry.length;
    }

    res.status(200).json({ totalContacts, dateCount, totalEnquiry, dateEnquiryCount, allContacts, filteredContacts, allEnquiry, filteredEnquiry });
  } catch (error) {
    res.status(500).json({ message: "Error fetching count", error });
  }
};