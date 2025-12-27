const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/notebook";

const connectToMongoose = async () => {
    await mongoose.connect(mongoURI)
    console.log("mongoose connected successfully");

};

module.exports  = connectToMongoose