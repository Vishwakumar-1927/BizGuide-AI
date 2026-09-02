import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaRobot,
    FaEnvelope,
    FaLock,
    FaArrowRight,
    FaShieldAlt,
    FaChartLine,
} from "react-icons/fa";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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

        setLoading(true);

        try {

            const response = await fetch(
                "https://bizguide-ai-backend.onrender.com/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (data.success) {

                localStorage.setItem("token", data.token);

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                alert("Login Successful!");

                navigate("/");

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

        <div className="login-page">

            {/* Background Decorations */}

            <div className="login-bg-orb login-orb-one"></div>
            <div className="login-bg-orb login-orb-two"></div>

            <div className="login-container">

                {/* ============================= */}
                {/* Left Information Panel */}
                {/* ============================= */}

                <div className="login-intro">

                    <div className="login-brand-icon">
                        <FaRobot />
                    </div>

                    <div className="login-eyebrow">
                        <span></span>
                        BIZGUIDE AI
                    </div>

                    <h1>
                        Welcome
                        <span> Back.</span>
                    </h1>

                    <p>
                        Continue your journey with AI-powered
                        business intelligence and smarter
                        decision making.
                    </p>

                    <div className="login-features">

                        <div className="login-feature">
                            <div className="feature-icon">
                                <FaChartLine />
                            </div>

                            <div>
                                <strong>Smart Business Analysis</strong>
                                <span>
                                    Turn your ideas into actionable insights.
                                </span>
                            </div>
                        </div>

                        <div className="login-feature">
                            <div className="feature-icon">
                                <FaShieldAlt />
                            </div>

                            <div>
                                <strong>Secure Account</strong>
                                <span>
                                    Your account and business data stay protected.
                                </span>
                            </div>
                        </div>

                    </div>

                </div>

                {/* ============================= */}
                {/* Login Card */}
                {/* ============================= */}

                <div className="login-card">

                    <div className="login-card-header">

                        <div className="mobile-login-icon">
                            <FaRobot />
                        </div>

                        <span>ACCOUNT ACCESS</span>

                        <h2>
                            Sign in to your account
                        </h2>

                        <p>
                            Enter your credentials to continue.
                        </p>

                    </div>

                    <form onSubmit={handleSubmit}>

                        {/* Email */}

                        <div className="login-field">

                            <label>
                                <FaEnvelope />
                                Email Address
                            </label>

                            <div className="login-input-wrapper">

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

                        <div className="login-field">

                            <label>
                                <FaLock />
                                Password
                            </label>

                            <div className="login-input-wrapper">

                                <FaLock />

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        {/* Submit */}

                        <button
                            type="submit"
                            className="login-submit-btn"
                            disabled={loading}
                        >

                            <span>
                                {loading
                                    ? "Signing In..."
                                    : "Sign In"}
                            </span>

                            {!loading && <FaArrowRight />}

                        </button>

                    </form>

                    <div className="login-divider">
                        <span></span>
                        <p>NEW TO BIZGUIDE AI?</p>
                        <span></span>
                    </div>

                    <p className="bottom-text">

                        Don't have an account?

                        <Link to="/register">
                            Create Account
                        </Link>

                    </p>

                    <div className="login-security">

                        <FaShieldAlt />

                        <span>
                            Secure authentication powered by BizGuide AI
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;