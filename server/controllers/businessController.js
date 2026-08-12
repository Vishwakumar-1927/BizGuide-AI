const jwt = require("jsonwebtoken");

const { generateBusinessReport } = require("../services/aiService");
const BusinessReport = require("../models/BusinessReport");
const User = require("../models/User");

// Home API
const home = (req, res) => {
    res.json({
        app: "BizGuide AI",
        version: "1.0",
        status: "Server Running"
    });
};

// About API
const about = (req, res) => {
    res.send("This is BizGuide AI Backend.");
};

// Analyze Business API
const analyzeBusiness = async (req, res) => {
    try {

        // Generate AI Report
        const report = await generateBusinessReport(req.body);

        let savedReport = null;

        // Check whether user is logged in
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith("Bearer ")) {

            try {

                const token = authHeader.split(" ")[1];

                const decoded = jwt.verify(
                    token,
                    process.env.JWT_SECRET
                );

                const user = await User.findById(decoded.id);

                if (user) {

                    savedReport = await BusinessReport.create({

                        user: user._id,

                        businessName: req.body.businessName,

                        category: req.body.category,

                        location: req.body.location,

                        budget: req.body.budget,

                        description: req.body.description,

                        report

                    });

                }

            } catch (error) {

                console.log("Guest User - Report not saved.");

            }

        }

        res.status(200).json({

            success: true,

            business: {

                businessName: req.body.businessName,

                category: req.body.category,

                location: req.body.location,

                budget: req.body.budget,

                description: req.body.description

            },

            report,

            reportId: savedReport ? savedReport._id : null

        });

    } catch (error) {

        console.error("Analyze Error:", error);

        res.status(500).json({

            success: false,

            message: "Failed to generate AI report."

        });

    }

};

// Get Reports
const getReports = async (req, res) => {

    try {

        let reports;

        // Admin
        if (req.user.role === "admin") {

            reports = await BusinessReport.find()

                .sort({

                    createdAt: -1

                });

        }

        // Normal User
        else {

            reports = await BusinessReport.find({

                user: req.user._id

            }).sort({

                createdAt: -1

            });

        }

        res.status(200).json({

            success: true,

            count: reports.length,

            reports

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Failed to fetch reports."

        });

    }

};
// Delete Report
const deleteReport = async (req, res) => {

    try {

        const report = await BusinessReport.findById(req.params.id);

        if (!report) {

            return res.status(404).json({
                success: false,
                message: "Report not found."
            });

        }

        // Admin can delete any report
        if (req.user.role === "admin") {

            await BusinessReport.findByIdAndDelete(req.params.id);

        }

        // User can delete only their own report
        else {

            if (report.user.toString() !== req.user._id.toString()) {

                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to delete this report."
                });

            }

            await BusinessReport.findByIdAndDelete(req.params.id);

        }

        res.status(200).json({

            success: true,

            message: "Report deleted successfully."

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Failed to delete report."

        });

    }

};

module.exports = {

    home,

    about,

    analyzeBusiness,

    getReports,

    deleteReport

};