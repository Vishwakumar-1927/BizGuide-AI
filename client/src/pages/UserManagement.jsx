import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserManagement.css";

function UserManagement() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [updatingUser, setUpdatingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  // =============================
  // Fetch Users
  // =============================

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const currentUser = JSON.parse(
        localStorage.getItem("user")
      );

      // Check login
      if (!token) {
        navigate("/login");
        return;
      }

      // Check admin
      if (currentUser?.role !== "admin") {
        alert("Admin access only.");
        navigate("/");
        return;
      }

      const response = await fetch(
        "https://bizguide-ai-backend.onrender.com/api/admin/users",
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      // Unauthorized
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      // Forbidden
      if (response.status === 403) {
        alert("Admin access only.");
        navigate("/");
        return;
      }

      if (!data.success) {
        alert(
          data.message ||
          "Failed to load users."
        );

        return;
      }

      setUsers(data.users);

    } catch (error) {

      console.error(
        "Users Error:",
        error
      );

      alert(
        "Unable to connect to server."
      );

    } finally {

      setLoading(false);

    }
  };

  // =============================
  // Change User Role
  // =============================

  const handleRoleChange = async (
    userId,
    currentRole
  ) => {

    const newRole =
      currentRole === "admin"
        ? "user"
        : "admin";

    const confirmChange =
      window.confirm(
        `Change this user's role from ${currentRole} to ${newRole}?`
      );

    if (!confirmChange) {
      return;
    }

    try {

      setUpdatingUser(userId);

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `https://bizguide-ai-backend.onrender.com/api/admin/users/${userId}/role`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            role: newRole,
          }),
        }
      );

      const data =
        await response.json();

      // Unauthorized
      if (response.status === 401) {

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        navigate("/login");

        return;
      }

      // Forbidden
      if (response.status === 403) {

        alert(
          "Admin access only."
        );

        navigate("/");

        return;
      }

      if (!data.success) {

        alert(
          data.message ||
          "Failed to change user role."
        );

        return;
      }

      // Update UI
      setUsers(
        (previousUsers) =>
          previousUsers.map(
            (user) =>
              user._id === userId
                ? {
                    ...user,
                    role: newRole,
                  }
                : user
          )
      );

      alert(
        `User role changed to ${newRole}.`
      );

    } catch (error) {

      console.error(
        "Role Update Error:",
        error
      );

      alert(
        "Unable to update user role."
      );

    } finally {

      setUpdatingUser(null);

    }
  };

  // =============================
  // Delete User
  // =============================

  const handleDeleteUser = async (
    userId
  ) => {

    const currentUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    // Prevent deleting yourself
    if (
      currentUser?.id === userId ||
      currentUser?._id === userId
    ) {
      alert(
        "You cannot delete your own account."
      );

      return;
    }

    const userToDelete =
      users.find(
        (user) => user._id === userId
      );

    const confirmDelete =
      window.confirm(
        `Are you sure you want to delete ${userToDelete?.name || "this user"}?`
      );

    if (!confirmDelete) {
      return;
    }

    try {

      setDeletingUser(userId);

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `https://bizguide-ai-backend.onrender.com/api/admin/users/${userId}`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      // Unauthorized
      if (response.status === 401) {

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        navigate("/login");

        return;
      }

      // Forbidden
      if (response.status === 403) {

        alert(
          "Admin access only."
        );

        navigate("/");

        return;
      }

      if (!data.success) {

        alert(
          data.message ||
          "Failed to delete user."
        );

        return;
      }

      // Remove user from UI
      setUsers(
        (previousUsers) =>
          previousUsers.filter(
            (user) =>
              user._id !== userId
          )
      );

      alert(
        "User deleted successfully."
      );

    } catch (error) {

      console.error(
        "Delete User Error:",
        error
      );

      alert(
        "Unable to delete user."
      );

    } finally {

      setDeletingUser(null);

    }
  };

  // =============================
  // Search Users
  // =============================

  const filteredUsers =
    users.filter((user) => {

      const keyword =
        search.toLowerCase();

      return (
        user.name
          ?.toLowerCase()
          .includes(keyword) ||

        user.email
          ?.toLowerCase()
          .includes(keyword) ||

        user.role
          ?.toLowerCase()
          .includes(keyword)
      );
    });

  // =============================
  // Format Date
  // =============================

  const formatDate = (date) => {

    if (!date) {
      return "--";
    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =============================
  // Loading
  // =============================

  if (loading) {

    return (
      <div className="users-loading">

        <h2>
          Loading Users...
        </h2>

      </div>
    );
  }

  // =============================
  // UI
  // =============================

  return (

    <div className="users-page">

      {/* ============================= */}
      {/* Header */}
      {/* ============================= */}

      <div className="users-header">

        <div>

          <span className="admin-badge">
            ADMIN PANEL
          </span>

          <h1>
            User Management
          </h1>

          <p>
            View and manage registered
            BizGuide AI users.
          </p>

        </div>

        <button
          className="back-admin-btn"
          onClick={() =>
            navigate("/admin")
          }
        >
          ← Dashboard
        </button>

      </div>

      {/* ============================= */}
      {/* Search */}
      {/* ============================= */}

      <div className="users-toolbar">

        <input
          type="text"
          placeholder="Search by name, email or role..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <span>

          {filteredUsers.length} user
          {filteredUsers.length !== 1
            ? "s"
            : ""}

        </span>

      </div>

      {/* ============================= */}
      {/* Users */}
      {/* ============================= */}

      {filteredUsers.length === 0 ? (

        <div className="no-users">

          <h2>
            No Users Found
          </h2>

          <p>
            No users match your search.
          </p>

        </div>

      ) : (

        <div className="users-table-container">

          <table className="users-table">

            <thead>

              <tr>

                <th>
                  Name
                </th>

                <th>
                  Email
                </th>

                <th>
                  Role
                </th>

                <th>
                  Joined
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.map(
                (user) => (

                  <tr
                    key={user._id}
                  >

                    {/* Name */}

                    <td>

                      <div className="user-name-cell">

                        <div className="user-avatar">

                          {user.name
                            ?.charAt(0)
                            .toUpperCase()}

                        </div>

                        <strong>
                          {user.name}
                        </strong>

                      </div>

                    </td>

                    {/* Email */}

                    <td>
                      {user.email}
                    </td>

                    {/* Role */}

                    <td>

                      <span
                        className={
                          user.role === "admin"
                            ? "role-admin"
                            : "role-user"
                        }
                      >
                        {user.role}
                      </span>

                    </td>

                    {/* Joined */}

                    <td>
                      {formatDate(
                        user.createdAt
                      )}
                    </td>

                    {/* Actions */}

                    <td>

                      <div className="user-actions">

                        {/* Role Button */}

                        <button
                          className={
                            user.role === "admin"
                              ? "role-action user-action"
                              : "role-action admin-action"
                          }

                          onClick={() =>
                            handleRoleChange(
                              user._id,
                              user.role
                            )
                          }

                          disabled={
                            updatingUser ===
                            user._id ||
                            deletingUser ===
                            user._id
                          }
                        >

                          {updatingUser ===
                          user._id

                            ? "Updating..."

                            : user.role ===
                              "admin"

                            ? "Make User"

                            : "Make Admin"}

                        </button>

                        {/* Delete Button */}

                        <button
                          className="delete-user-btn"

                          onClick={() =>
                            handleDeleteUser(
                              user._id
                            )
                          }

                          disabled={
                            updatingUser ===
                            user._id ||
                            deletingUser ===
                            user._id
                          }
                        >

                          {deletingUser ===
                          user._id
                            ? "Deleting..."
                            : "Delete"}

                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default UserManagement;