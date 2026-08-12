import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    return (
        <header className="navbar">

            <div className="navbar-container">

                {/* ============================= */}
                {/* Logo */}
                {/* ============================= */}

                <div
                    className="logo"
                    onClick={() => navigate("/")}
                >
                    🚀 BizGuide AI
                </div>


                {/* ============================= */}
                {/* Navigation */}
                {/* ============================= */}

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

                    {/* Admin Link */}

                    {token && user?.role === "admin" && (
                        <NavLink to="/admin">
                            Admin
                        </NavLink>
                    )}

                    <NavLink to="/about">
                        About
                    </NavLink>

                </nav>


                {/* ============================= */}
                {/* Right Side */}
                {/* ============================= */}

                <div className="nav-buttons">

                    {!token ? (

                        <>
                            <button
                                className="login-btn"
                                onClick={() =>
                                    navigate("/login")
                                }
                            >
                                Login
                            </button>

                            <button
                                className="start-btn"
                                onClick={() =>
                                    navigate("/register")
                                }
                            >
                                Register
                            </button>
                        </>

                    ) : (

                        <>
                            <div className="user-name">
                                👋 {user?.name}
                            </div>

                            <button
                                className="login-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                            <button
                                className="start-btn"
                                onClick={() =>
                                    navigate("/analyze")
                                }
                            >
                                Analyze →
                            </button>
                        </>

                    )}

                </div>

            </div>

        </header>
    );
}

export default Navbar;