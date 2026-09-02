import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaRobot,
    FaUser,
    FaEnvelope,
    FaLock,
    FaArrowRight,
    FaShieldAlt,
    FaLightbulb,
    FaChartLine,
} from "react-icons/fa";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {

            alert("Passwords do not match.");

            return;
        }

        setLoading(true);

        try {

            const response = await fetch(
                "https://bizguide-ai-backend.onrender.com/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password
                    })
                }
            );

            const data = await response.json();

            if (data.success) {

                alert("Registration Successful!");

                navigate("/login");

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Something went wrong.");

        }

        setLoading(false);
    };

    return (

        <div className="register-page">

            {/* Background Decorations */}

            <div className="register-bg-orb register-orb-one"></div>
            <div className="register-bg-orb register-orb-two"></div>

            <div className="register-container">

                {/* ================================= */}
                {/* Left Introduction */}
                {/* ================================= */}

                <div className="register-intro">

                    <div className="register-brand-icon">
                        <FaRobot />
                    </div>

                    <div className="register-eyebrow">
                        <span></span>
                        BIZGUIDE AI
                    </div>

                    <h1>
                        Build Your
                        <span> Business Future.</span>
                    </h1>

                    <p>
                        Create your BizGuide AI account and get
                        intelligent insights to evaluate, plan,
                        and grow your business ideas.
                    </p>

                    <div className="register-features">

                        <div className="register-feature">

                            <div className="register-feature-icon">
                                <FaLightbulb />
                            </div>

                            <div>
                                <strong>Turn Ideas Into Plans</strong>

                                <span>
                                    Transform your business idea
                                    into a structured plan.
                                </span>
                            </div>

                        </div>

                        <div className="register-feature">

                            <div className="register-feature-icon">
                                <FaChartLine />
                            </div>

                            <div>
                                <strong>AI-Powered Insights</strong>

                                <span>
                                    Analyze markets, finances,
                                    risks, and opportunities.
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

                {/* ================================= */}
                {/* Register Card */}
                {/* ================================= */}

                <div className="register-card">

                    <div className="register-card-header">

                        <div className="mobile-register-icon">
                            <FaRobot />
                        </div>

                        <span>CREATE YOUR ACCOUNT</span>

                        <h2>
                            Start your journey
                        </h2>

                        <p>
                            Create an account to access BizGuide AI.
                        </p>

                    </div>

                    <form onSubmit={handleSubmit}>

                        {/* Full Name */}

                        <div className="register-field">

                            <label>
                                <FaUser />
                                Full Name
                            </label>

                            <div className="register-input-wrapper">

                                <FaUser />

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        {/* Email */}

                        <div className="register-field">

                            <label>
                                <FaEnvelope />
                                Email Address
                            </label>

                            <div className="register-input-wrapper">

                                <FaEnvelope />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        {/* Password */}

                        <div className="register-field">

                            <label>
                                <FaLock />
                                Password
                            </label>

                            <div className="register-input-wrapper">

                                <FaLock />

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        {/* Confirm Password */}

                        <div className="register-field">

                            <label>
                                <FaLock />
                                Confirm Password
                            </label>

                            <div className="register-input-wrapper">

                                <FaLock />

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        {/* Register Button */}

                        <button
                            type="submit"
                            className="register-submit-btn"
                            disabled={loading}
                        >

                            <span>
                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </span>

                            {!loading && <FaArrowRight />}

                        </button>

                    </form>

                    <div className="register-divider">

                        <span></span>

                        <p>ALREADY HAVE AN ACCOUNT?</p>

                        <span></span>

                    </div>

                    <p className="register-bottom-text">

                        Already have an account?

                        <Link to="/login">
                            Sign In
                        </Link>

                    </p>

                    <div className="register-security">

                        <FaShieldAlt />

                        <span>
                            Your account is protected by secure authentication
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;