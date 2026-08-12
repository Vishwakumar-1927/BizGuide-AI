import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Edit Profile
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  // Change Password
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
        "http://localhost:5000/api/auth/profile",
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
        "http://localhost:5000/api/auth/profile",
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

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

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

    // Validation
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
        "http://localhost:5000/api/auth/change-password",
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

      // JWT expired / invalid
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

      // Clear password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Close password section
      setIsChangingPassword(false);

    } catch (error) {
      console.error(error);

      alert(
        "Unable to connect to the server."
      );
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
        <div className="profile-card">
          <div className="profile-loading">
            Loading Profile...
          </div>
        </div>
      </div>
    );
  }

  // =============================
  // Profile UI
  // =============================
  return (
    <div className="profile-page">

      <div className="profile-card">

        {/* ============================= */}
        {/* Profile Header */}
        {/* ============================= */}

        <div className="profile-header">

          <div className="avatar">
            👤
          </div>

          <h1>My Profile</h1>

          <p>
            Welcome back, {user?.name}
          </p>

        </div>

        {/* ============================= */}
        {/* Profile Information */}
        {/* ============================= */}

        <div className="profile-info">

          {isEditing ? (
            <>
              <div className="info-row">

                <span>Name</span>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />

              </div>

              <div className="info-row">

                <span>Email</span>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />

              </div>
            </>
          ) : (
            <>
              <div className="info-row">

                <span>Name</span>

                <strong>
                  {user?.name}
                </strong>

              </div>

              <div className="info-row">

                <span>Email</span>

                <strong>
                  {user?.email}
                </strong>

              </div>
            </>
          )}

          <div className="info-row">

            <span>Role</span>

            <strong>
              {user?.role}
            </strong>

          </div>

          <div className="info-row">

            <span>Joined</span>

            <strong>
              {formatDate(user?.createdAt)}
            </strong>

          </div>

        </div>

        {/* ============================= */}
        {/* Edit Profile Buttons */}
        {/* ============================= */}

        {!isChangingPassword && (
          <div className="profile-buttons">

            {isEditing ? (
              <>
                <button
                  className="edit-btn"
                  onClick={handleUpdate}
                >
                  Save Changes
                </button>

                <button
                  className="password-btn"
                  onClick={() => {
                    setFormData({
                      name: user.name,
                      email: user.email,
                    });

                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setIsEditing(true);
                    setIsChangingPassword(false);
                  }}
                >
                  Edit Profile
                </button>

                <button
                  className="password-btn"
                  onClick={() => {
                    setIsChangingPassword(true);
                    setIsEditing(false);
                  }}
                >
                  Change Password
                </button>
              </>
            )}

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        )}

        {/* ============================= */}
        {/* Change Password Section */}
        {/* ============================= */}

        {isChangingPassword && (

          <div className="password-section">

            <h2>
              🔒 Change Password
            </h2>

            <p>
              Enter your current password and choose
              a new password.
            </p>

            <div className="password-form">

              {/* Current Password */}

              <div className="password-field">

                <label>
                  Current Password
                </label>

                <input
                  type="password"
                  name="currentPassword"
                  value={
                    passwordData.currentPassword
                  }
                  onChange={
                    handlePasswordChange
                  }
                  placeholder="Enter current password"
                />

              </div>

              {/* New Password */}

              <div className="password-field">

                <label>
                  New Password
                </label>

                <input
                  type="password"
                  name="newPassword"
                  value={
                    passwordData.newPassword
                  }
                  onChange={
                    handlePasswordChange
                  }
                  placeholder="Enter new password"
                />

              </div>

              {/* Confirm Password */}

              <div className="password-field">

                <label>
                  Confirm New Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={
                    passwordData.confirmPassword
                  }
                  onChange={
                    handlePasswordChange
                  }
                  placeholder="Confirm new password"
                />

              </div>

            </div>

            {/* Password Buttons */}

            <div className="profile-buttons">

              <button
                className="edit-btn"
                onClick={handlePasswordUpdate}
                disabled={passwordLoading}
              >
                {passwordLoading
                  ? "Updating..."
                  : "Update Password"}
              </button>

              <button
                className="password-btn"
                onClick={handleCancelPassword}
                disabled={passwordLoading}
              >
                Cancel
              </button>

              <button
                className="logout-btn"
                onClick={handleLogout}
                disabled={passwordLoading}
              >
                Logout
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Profile;