
const mongoose = require("mongoose");

const connect = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log(`MongoDB connected`);
      });
  } catch (error) {
    console.log(`Connection Error: ${error}`);
  }
};

module.exports = connect;
