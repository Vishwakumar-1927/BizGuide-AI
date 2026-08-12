import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

            const response = await fetch("http://localhost:5000/api/auth/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })

            });

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

            <div className="register-card">

                <h1>Create Account 🚀</h1>

                <p>Join BizGuide AI today.</p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">

                        {loading ? "Creating Account..." : "Register"}

                    </button>

                </form>

                <p className="bottom-text">

                    Already have an account?

                    <Link to="/login">

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;