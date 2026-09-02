import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
  FaEdit,
  FaLock,
  FaSignOutAlt,
  FaSave,
  FaTimes,
  FaShieldAlt,
  FaKey,
  FaCheckCircle,
} from "react-icons/fa";

import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  // =============================
  // Get Profile
  // =============================
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "https://bizguide-ai-backend.onrender.com/api/auth/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      if (data.success) {
        setUser(data.user);

        setFormData({
          name: data.user.name,
          email: data.user.email,
        });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // Logout
  // =============================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  // =============================
  // Edit Profile
  // =============================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Name and email are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://bizguide-ai-backend.onrender.com/api/auth/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      if (!data.success) {
        alert(data.message || "Failed to update profile.");
        return;
      }

      setUser(data.user);

      localStorage.setItem("user", JSON.stringify(data.user));

      alert("✅ Profile updated successfully.");

      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  };

  // =============================
  // Password Input Change
  // =============================
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  // =============================
  // Change Password
  // =============================
  const handlePasswordUpdate = async () => {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwordData;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      alert("Please fill all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      alert("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      alert(
        "New password must be different from your current password."
      );
      return;
    }

    try {
      setPasswordLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "https://bizguide-ai-backend.onrender.com/api/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      if (!data.success) {
        alert(
          data.message || "Failed to change password."
        );
        return;
      }

      alert("✅ Password changed successfully.");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setIsChangingPassword(false);
    } catch (error) {
      console.error(error);

      alert("Unable to connect to the server.");
    } finally {
      setPasswordLoading(false);
    }
  };

  // =============================
  // Cancel Password Change
  // =============================
  const handleCancelPassword = () => {
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setIsChangingPassword(false);
  };

  // =============================
  // Format Date
  // =============================
  const formatDate = (date) => {
    if (!date) {
      return "--";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  // =============================
  // Loading
  // =============================
  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading-card">
          <div className="profile-spinner"></div>

          <h3>Loading Profile</h3>

          <p>
            Fetching your BizGuide AI account details...
          </p>
        </div>
      </div>
    );
  }

  // =============================
  // Profile UI
  // =============================
  return (
    <div className="profile-page">

      <div className="profile-wrapper">

        {/* ============================= */}
        {/* Profile Hero */}
        {/* ============================= */}

        <section className="profile-hero">

          <div className="profile-hero-glow"></div>

          <div className="profile-hero-content">

            <div className="profile-eyebrow">
              <FaUser />
              <span>ACCOUNT CENTER</span>
            </div>

            <h1>
              My <span>Profile</span>
            </h1>

            <p>
              Manage your BizGuide AI account,
              personal information, and security settings.
            </p>

          </div>

          <div className="profile-hero-icon">
            <FaUser />
          </div>

        </section>

        {/* ============================= */}
        {/* Main Profile Card */}
        {/* ============================= */}

        <section className="profile-main-card">

          {/* Profile Identity */}

          <div className="profile-identity">

            <div className="profile-avatar">
              <FaUser />
            </div>

            <div className="identity-content">

              <span className="identity-label">
                ACCOUNT PROFILE
              </span>

              <h2>
                {user?.name || "User"}
              </h2>

              <p>
                <FaEnvelope />
                {user?.email || "--"}
              </p>

            </div>

            <div className="profile-status">
              <span></span>
              Active Account
            </div>

          </div>

          {/* ============================= */}
          {/* Account Information */}
          {/* ============================= */}

          <div className="profile-section-heading">

            <div className="heading-icon">
              <FaUserShield />
            </div>

            <div>
              <span>ACCOUNT DETAILS</span>
              <h2>Personal Information</h2>
            </div>

          </div>

          <div className="profile-info-grid">

            {/* Name */}

            <div className="profile-info-item">

              <div className="info-icon">
                <FaUser />
              </div>

              <div className="info-content">

                <span>FULL NAME</span>

                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                ) : (
                  <strong>
                    {user?.name || "--"}
                  </strong>
                )}

              </div>

            </div>

            {/* Email */}

            <div className="profile-info-item">

              <div className="info-icon">
                <FaEnvelope />
              </div>

              <div className="info-content">

                <span>EMAIL ADDRESS</span>

                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                ) : (
                  <strong>
                    {user?.email || "--"}
                  </strong>
                )}

              </div>

            </div>

            {/* Role */}

            <div className="profile-info-item">

              <div className="info-icon">
                <FaUserShield />
              </div>

              <div className="info-content">

                <span>ACCOUNT ROLE</span>

                <strong className="role-value">
                  {user?.role || "--"}
                </strong>

              </div>

            </div>

            {/* Joined */}

            <div className="profile-info-item">

              <div className="info-icon">
                <FaCalendarAlt />
              </div>

              <div className="info-content">

                <span>MEMBER SINCE</span>

                <strong>
                  {formatDate(user?.createdAt)}
                </strong>

              </div>

            </div>

          </div>

          {/* ============================= */}
          {/* Profile Actions */}
          {/* ============================= */}

          {!isChangingPassword && (

            <div className="profile-actions">

              {isEditing ? (
                <>
                  <button
                    className="profile-primary-btn"
                    onClick={handleUpdate}
                  >
                    <FaSave />
                    Save Changes
                  </button>

                  <button
                    className="profile-secondary-btn"
                    onClick={() => {
                      setFormData({
                        name: user.name,
                        email: user.email,
                      });

                      setIsEditing(false);
                    }}
                  >
                    <FaTimes />
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="profile-primary-btn"
                    onClick={() => {
                      setIsEditing(true);
                      setIsChangingPassword(false);
                    }}
                  >
                    <FaEdit />
                    Edit Profile
                  </button>

                  <button
                    className="profile-secondary-btn"
                    onClick={() => {
                      setIsChangingPassword(true);
                      setIsEditing(false);
                    }}
                  >
                    <FaLock />
                    Change Password
                  </button>
                </>
              )}

              <button
                className="profile-logout-btn"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                Logout
              </button>

            </div>

          )}

          {/* ============================= */}
          {/* Security Section */}
          {/* ============================= */}

          {isChangingPassword && (

            <div className="password-section">

              <div className="password-header">

                <div className="password-header-icon">
                  <FaShieldAlt />
                </div>

                <div>
                  <span>ACCOUNT SECURITY</span>
                  <h2>Change Password</h2>
                  <p>
                    Update your password to keep your
                    account secure.
                  </p>
                </div>

              </div>

              <div className="security-notice">
                <FaCheckCircle />
                <span>
                  Use a password with at least 6 characters.
                </span>
              </div>

              <div className="password-form">

                <div className="password-field">

                  <label>
                    <FaKey />
                    Current Password
                  </label>

                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                  />

                </div>

                <div className="password-field">

                  <label>
                    <FaLock />
                    New Password
                  </label>

                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                  />

                </div>

                <div className="password-field">

                  <label>
                    <FaLock />
                    Confirm New Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                  />

                </div>

              </div>

              <div className="password-actions">

                <button
                  className="profile-primary-btn"
                  onClick={handlePasswordUpdate}
                  disabled={passwordLoading}
                >
                  <FaSave />

                  {passwordLoading
                    ? "Updating..."
                    : "Update Password"}
                </button>

                <button
                  className="profile-secondary-btn"
                  onClick={handleCancelPassword}
                  disabled={passwordLoading}
                >
                  <FaTimes />
                  Cancel
                </button>

                <button
                  className="profile-logout-btn"
                  onClick={handleLogout}
                  disabled={passwordLoading}
                >
                  <FaSignOutAlt />
                  Logout
                </button>

              </div>

            </div>

          )}

        </section>

      </div>

    </div>
  );
}

export default Profile;