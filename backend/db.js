const mongoose = require("mongoose");

// Use environment variable for MongoDB Atlas in production, local for development
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/notebook";

const connectToMongoose = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log(" MongoDB connected successfully");
    
    // Check if we're connected to MongoDB Atlas or local
    const host = mongoose.connection.host;
    if (host.includes('mongodb.net')) {
      console.log(" Connected to: MongoDB Atlas (Cloud)");
    } else {
      console.log(" Connected to: Local MongoDB");
    }
    
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    console.log("Using connection string:", mongoURI.replace(/:([^:@]+)@/, ':****@'));
    process.exit(1);
  }
};

module.exports = connectToMongoose;