const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// MongoDB Connection
const connectDB = require("./config/db");

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const businessRoutes = require("./routes/businessRoutes");
app.use("/", businessRoutes);

// Default Route
app.get("/", (req, res) => {
    res.json({
        message: "🚀 BizGuide AI Backend is Running..."
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
