const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(
      
    )
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));
};

module.exports = connectToDb;
