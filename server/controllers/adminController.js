const User = require("../models/User");
const BusinessReport = require("../models/BusinessReport");

// =====================================
// Admin Dashboard
// =====================================

const getDashboardStats = async (req, res) => {
    try {

        // Count all users
        const totalUsers = await User.countDocuments();

        // Count all business reports
        const totalReports = await BusinessReport.countDocuments();

        res.status(200).json({
            success: true,

            stats: {
                totalUsers,
                totalReports,
                totalAnalyses: totalReports
            }
        });

    } catch (error) {

        console.error(
            "Admin Dashboard Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to load admin dashboard."
        });
    }
};


// =====================================
// Get All Users
// =====================================

const getAllUsers = async (req, res) => {
    try {

        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });

    } catch (error) {

        console.error(
            "Get Users Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch users."
        });
    }
};


// =====================================
// Update User Role
// =====================================

const updateUserRole = async (req, res) => {
    try {

        const { userId } = req.params;
        const { role } = req.body;

        // Validate role
        if (!["user", "admin"].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role."
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Prevent admin from changing their own role
        if (
            user._id.toString() ===
            req.user._id.toString()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "You cannot change your own role."
            });
        }

        user.role = role;

        await user.save();

        res.status(200).json({
            success: true,
            message:
                `User role changed to ${role}.`,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });

    } catch (error) {

        console.error(
            "Update Role Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to update user role."
        });
    }
};


// =====================================
// Delete User
// =====================================

const deleteUser = async (req, res) => {
    try {

        const { userId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        // Prevent admin from deleting themselves
        if (
            user._id.toString() ===
            req.user._id.toString()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "You cannot delete your own account."
            });
        }

        await User.findByIdAndDelete(userId);

        res.status(200).json({
            success: true,
            message:
                "User deleted successfully."
        });

    } catch (error) {

        console.error(
            "Delete User Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to delete user."
        });
    }
};


// =====================================
// Get All Business Reports
// =====================================

// =====================================
// Get All Business Reports
// =====================================

const getAllReports = async (req, res) => {
    try {

        const reports = await BusinessReport.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reports.length,
            reports
        });

    } catch (error) {

        console.error(
            "Get Reports Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch reports."
        });
    }
};

// =====================================
// Get Single Business Report
// =====================================

const getReportById = async (req, res) => {
    try {

        const { reportId } = req.params;

        const report = await BusinessReport.findById(reportId)
            .populate("user", "name email");

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found."
            });
        }

        res.status(200).json({
            success: true,
            report
        });

    } catch (error) {

        console.error(
            "Get Report Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch report."
        });
    }
};

// =====================================
// Delete Business Report
// =====================================

// =====================================
// Delete Business Report
// =====================================

const deleteReport = async (req, res) => {
    try {
        const { reportId } = req.params;

        const report = await BusinessReport.findById(reportId);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found."
            });
        }

        await BusinessReport.findByIdAndDelete(reportId);

        res.status(200).json({
            success: true,
            message: "Report deleted successfully."
        });

    } catch (error) {

        console.error(
            "Delete Report Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to delete report."
        });
    }
};


// =====================================
// Exports
// =====================================

module.exports = {
    getDashboardStats,
    getAllUsers,
    updateUserRole,
    deleteUser,
    getAllReports,
    getReportById,
    deleteReport
};