const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =============================
// Register
// =============================
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const normalizedName = name.trim();

        // Check if email already exists
        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await User.create({
                name: normalizedName,
                email: normalizedEmail,
                password: hashedPassword
            });
        } catch (error) {
            // Handles duplicate email race conditions
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists."
                });
            }

            throw error;
        }

        res.status(201).json({
            success: true,
            message: "Registration successful."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Registration failed."
        });
    }
};

// =============================
// Login
// =============================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Login failed."
        });
    }
};

// =============================
// Get Profile
// =============================
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to load profile."
        });
    }
};

// =============================
// Update Profile
// =============================
const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (name !== undefined) {
            const normalizedName = name.trim();

            if (!normalizedName) {
                return res.status(400).json({
                    success: false,
                    message: "Name cannot be empty."
                });
            }

            user.name = normalizedName;
        }

        if (email !== undefined) {
            const normalizedEmail = email.trim().toLowerCase();

            if (!normalizedEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Email cannot be empty."
                });
            }

            // Check only when the email is actually changing
            if (normalizedEmail !== user.email) {
                const existingUser = await User.findOne({
                    email: normalizedEmail,
                    _id: { $ne: user._id }
                });

                if (existingUser) {
                    return res.status(400).json({
                        success: false,
                        message: "Email already exists."
                    });
                }

                user.email = normalizedEmail;
            }
        }

        try {
            await user.save();
        } catch (error) {
            // Handles duplicate email race conditions
            if (error.code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists."
                });
            }

            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update profile."
        });
    }
};

// =============================
// Change Password
// =============================
const changePassword = async (req, res) => {
    try {
        const {
            currentPassword,
            newPassword
        } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required."
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect."
            });
        }

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to change password."
        });
    }
};

// =============================
// Exports
// =============================
module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword
};