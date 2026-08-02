const mongoose = require("mongoose");
const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB successfully :))");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
};

export default connectToDB;
