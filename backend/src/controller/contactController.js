const Contact = require("../model/Contact");

const saveContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save message" });
  }
};

module.exports = { saveContact };
