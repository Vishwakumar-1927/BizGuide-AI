const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        console.log("Mongoose Version:", mongoose.version);

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.log("========== ERROR ==========");
        console.log(err.name);
        console.log(err.message);
        console.log(err.stack);
        console.log("===========================");
    }
};

module.exports = connectDB;