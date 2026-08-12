const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    home,
    about,
    analyzeBusiness,
    getReports,
    deleteReport
} = require("../controllers/businessController");

// Home
router.get("/", home);

// About
router.get("/about", about);

// Public Analyze API
router.post("/analyze", analyzeBusiness);

// Protected History API
router.get("/reports", authMiddleware, getReports);

// Protected Delete API
router.delete("/reports/:id", authMiddleware, deleteReport);

module.exports = router;