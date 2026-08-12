const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword
} = require("../controllers/authController");


// =============================
// Register
// =============================
router.post("/register", register);


// =============================
// Login
// =============================
router.post("/login", login);


// =============================
// Get Profile
// =============================
router.get(
    "/profile",
    authMiddleware,
    getProfile
);


// =============================
// Update Profile
// =============================
router.put(
    "/profile",
    authMiddleware,
    updateProfile
);


// =============================
// Change Password
// =============================
router.put(
    "/change-password",
    authMiddleware,
    changePassword
);


module.exports = router;