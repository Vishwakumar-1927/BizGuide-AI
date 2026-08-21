const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    getDashboardStats,
    getAllUsers,
    updateUserRole,
    deleteUser,
    getAllReports,
    getReportById,
    deleteReport
} = require("../controllers/adminController");


// =====================================
// Admin Dashboard
// =====================================

router.get(
    "/dashboard",
    authMiddleware,
    adminMiddleware,
    getDashboardStats
);


// =====================================
// Get All Users
// =====================================

router.get(
    "/users",
    authMiddleware,
    adminMiddleware,
    getAllUsers
);


// =====================================
// Change User Role
// =====================================

router.put(
    "/users/:userId/role",
    authMiddleware,
    adminMiddleware,
    updateUserRole
);


// =====================================
// Delete User
// =====================================

router.delete(
    "/users/:userId",
    authMiddleware,
    adminMiddleware,
    deleteUser
);


// =====================================
// Get All Reports
// =====================================

router.get(
    "/reports",
    authMiddleware,
    adminMiddleware,
    getAllReports
);


// =====================================
// Get Single Report
// =====================================

router.get(
    "/reports/:reportId",
    authMiddleware,
    adminMiddleware,
    getReportById
);


// =====================================
// Delete Report
// =====================================

router.delete(
    "/reports/:reportId",
    authMiddleware,
    adminMiddleware,
    deleteReport
);


module.exports = router;