import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    return (
        <header className="navbar">

            <div className="navbar-container">

                {/* Logo */}

                <div
                    className="navbar-logo"
                    onClick={() => navigate("/")}
                >

                    <div className="logo-icon">
                        ✦
                    </div>

                    <div className="logo-text">
                        <strong>BizGuide</strong>
                        <span>AI</span>
                    </div>

                </div>


                {/* Navigation */}

                <nav className="nav-links">

                    <NavLink to="/">
                        Home
                    </NavLink>

                    <NavLink to="/analyze">
                        Analyze
                    </NavLink>

                    {token && (
                        <>
                            <NavLink to="/history">
                                History
                            </NavLink>

                            <NavLink to="/profile">
                                Profile
                            </NavLink>
                        </>
                    )}

                    {token && user?.role === "admin" && (
                        <NavLink to="/admin">
                            Admin
                        </NavLink>
                    )}

                    <NavLink to="/about">
                        About
                    </NavLink>

                </nav>


                {/* Right Side */}

                <div className="nav-actions">

                    {!token ? (

                        <>
                            <button
                                className="login-btn"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>

                            <button
                                className="register-btn"
                                onClick={() => navigate("/register")}
                            >
                                Get Started
                                <span>→</span>
                            </button>
                        </>

                    ) : (

                        <>

                            <div className="user-box">

                                <div className="user-avatar">
                                    {(user?.name || "U")
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div className="user-info">
                                    <span>Hello</span>
                                    <strong>
                                        {user?.name || "User"}
                                    </strong>
                                </div>

                            </div>

                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                            <button
                                className="analyze-btn"
                                onClick={() => navigate("/analyze")}
                            >
                                Analyze
                                <span>→</span>
                            </button>

                        </>

                    )}

                </div>

            </div>

        </header>
    );
}

export default Navbar;