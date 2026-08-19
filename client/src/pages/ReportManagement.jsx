import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReportManagement.css";

function ReportManagement() {
    const navigate = useNavigate();

    const [reports, setReports] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // View Report
    const [selectedReport, setSelectedReport] = useState(null);
    const [viewLoading, setViewLoading] = useState(false);

    // Delete Report
    const [deletingReport, setDeletingReport] = useState(null);

    useEffect(() => {
        fetchReports();
    }, []);

    // =====================================
    // Fetch Reports
    // =====================================

    const fetchReports = async () => {
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
                "https://bizguide-ai-backend.onrender.com/api/admin/reports",
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
                    "Failed to load reports."
                );

                return;
            }

            setReports(data.reports || []);

        } catch (error) {

            console.error(
                "Reports Error:",
                error
            );

            alert(
                "Unable to connect to server."
            );

        } finally {
            setLoading(false);
        }
    };

    // =====================================
    // View Report
    // =====================================

    const handleViewReport = async (reportId) => {
        try {
            setViewLoading(true);

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `https://bizguide-ai-backend.onrender.com/api/admin/reports/${reportId}`,
                {
                    method: "GET",

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

            // Not found
            if (response.status === 404) {
                alert("Report not found.");
                return;
            }

            if (!data.success) {
                alert(
                    data.message ||
                    "Failed to load report."
                );

                return;
            }

            setSelectedReport(data.report);

        } catch (error) {

            console.error(
                "View Report Error:",
                error
            );

            alert(
                "Unable to load report."
            );

        } finally {
            setViewLoading(false);
        }
    };

    // =====================================
    // Delete Report
    // =====================================

    const handleDeleteReport = async (reportId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this report?\n\nThis action cannot be undone."
        );

        if (!confirmDelete) {
            return;
        }

        try {

            setDeletingReport(reportId);

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `https://bizguide-ai-backend.onrender.com/api/admin/reports/${reportId}`,
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

            // Not found
            if (response.status === 404) {

                alert("Report not found.");

                return;
            }

            if (!data.success) {

                alert(
                    data.message ||
                    "Failed to delete report."
                );

                return;
            }

            // Remove report from table
            setReports((previousReports) =>
                previousReports.filter(
                    (report) =>
                        report._id !== reportId
                )
            );

            // Close modal if deleted report is open
            if (
                selectedReport?._id === reportId
            ) {
                setSelectedReport(null);
            }

            alert(
                "Report deleted successfully."
            );

        } catch (error) {

            console.error(
                "Delete Report Error:",
                error
            );

            alert(
                "Unable to delete report."
            );

        } finally {

            setDeletingReport(null);
        }
    };

    // =====================================
    // Search
    // =====================================

    const filteredReports =
        reports.filter((item) => {

            const keyword =
                search.toLowerCase();

            return (
                item.businessName
                    ?.toLowerCase()
                    .includes(keyword) ||

                item.category
                    ?.toLowerCase()
                    .includes(keyword) ||

                item.location
                    ?.toLowerCase()
                    .includes(keyword) ||

                item.user?.name
                    ?.toLowerCase()
                    .includes(keyword) ||

                item.user?.email
                    ?.toLowerCase()
                    .includes(keyword)
            );
        });

    // =====================================
    // Format Date
    // =====================================

    const formatDate = (date) => {

        if (!date) {
            return "--";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );
    };

    // =====================================
    // Loading
    // =====================================

    if (loading) {
        return (
            <div className="reports-loading">
                <h2>
                    Loading Reports...
                </h2>
            </div>
        );
    }

    // =====================================
    // UI
    // =====================================

    return (
        <div className="reports-page">

            {/* ============================= */}
            {/* Header */}
            {/* ============================= */}

            <div className="reports-header">

                <div>

                    <span className="admin-badge">
                        ADMIN PANEL
                    </span>

                    <h1>
                        Report Management
                    </h1>

                    <p>
                        View and manage business
                        analysis reports.
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

            <div className="reports-toolbar">

                <input
                    type="text"
                    placeholder="Search by business, category, location or user..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <span>
                    {filteredReports.length} report
                    {filteredReports.length !== 1
                        ? "s"
                        : ""}
                </span>

            </div>

            {/* ============================= */}
            {/* Reports Table */}
            {/* ============================= */}

            {filteredReports.length === 0 ? (

                <div className="no-reports">

                    <h2>
                        No Reports Found
                    </h2>

                    <p>
                        No business reports match
                        your search.
                    </p>

                </div>

            ) : (

                <div className="reports-table-container">

                    <table className="reports-table">

                        <thead>

                            <tr>

                                <th>
                                    Business
                                </th>

                                <th>
                                    Category
                                </th>

                                <th>
                                    Location
                                </th>

                                <th>
                                    Budget
                                </th>

                                <th>
                                    Created By
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredReports.map(
                                (item) => (

                                    <tr
                                        key={item._id}
                                    >

                                        {/* Business */}

                                        <td>
                                            <strong>
                                                {item.businessName ||
                                                    "Unnamed Business"}
                                            </strong>
                                        </td>

                                        {/* Category */}

                                        <td>

                                            <span className="category-badge">
                                                {item.category ||
                                                    "--"}
                                            </span>

                                        </td>

                                        {/* Location */}

                                        <td>
                                            {item.location ||
                                                "--"}
                                        </td>

                                        {/* Budget */}

                                        <td>
                                            {item.budget ||
                                                "--"}
                                        </td>

                                        {/* Created By */}

                                        <td>

                                            <div className="report-user">

                                                <strong>
                                                    {item.user?.name ||
                                                        "Unknown User"}
                                                </strong>

                                                <small>
                                                    {item.user?.email ||
                                                        "--"}
                                                </small>

                                            </div>

                                        </td>

                                        {/* Date */}

                                        <td>
                                            {formatDate(
                                                item.createdAt
                                            )}
                                        </td>

                                        {/* Actions */}

                                        <td>

                                            <div className="report-action-buttons">

                                                {/* View */}

                                                <button
                                                    className="view-report-btn"
                                                    onClick={() =>
                                                        handleViewReport(
                                                            item._id
                                                        )
                                                    }
                                                    disabled={
                                                        viewLoading ||
                                                        deletingReport ===
                                                        item._id
                                                    }
                                                >
                                                    {viewLoading
                                                        ? "Loading..."
                                                        : "View"}
                                                </button>

                                                {/* Delete */}

                                                <button
                                                    className="delete-report-btn"
                                                    onClick={() =>
                                                        handleDeleteReport(
                                                            item._id
                                                        )
                                                    }
                                                    disabled={
                                                        deletingReport ===
                                                        item._id
                                                    }
                                                >
                                                    {deletingReport ===
                                                    item._id
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

            {/* ============================= */}
            {/* Report Details Modal */}
            {/* ============================= */}

            {selectedReport && (

                <div className="report-modal-overlay">

                    <div className="report-modal">

                        {/* Modal Header */}

                        <div className="report-modal-header">

                            <div>

                                <span className="admin-badge">
                                    BUSINESS REPORT
                                </span>

                                <h2>
                                    {selectedReport.businessName}
                                </h2>

                            </div>

                            <button
                                className="close-report-btn"
                                onClick={() =>
                                    setSelectedReport(null)
                                }
                            >
                                ×
                            </button>

                        </div>

                        {/* ============================= */}
                        {/* Basic Information */}
                        {/* ============================= */}

                        <div className="report-details-grid">

                            <div className="report-detail-card">

                                <span>
                                    Category
                                </span>

                                <strong>
                                    {selectedReport.category ||
                                        "--"}
                                </strong>

                            </div>

                            <div className="report-detail-card">

                                <span>
                                    Location
                                </span>

                                <strong>
                                    {selectedReport.location ||
                                        "--"}
                                </strong>

                            </div>

                            <div className="report-detail-card">

                                <span>
                                    Budget
                                </span>

                                <strong>
                                    {selectedReport.budget ||
                                        "--"}
                                </strong>

                            </div>

                            <div className="report-detail-card">

                                <span>
                                    Created By
                                </span>

                                <strong>
                                    {selectedReport.user?.name ||
                                        "--"}
                                </strong>

                            </div>

                        </div>

                        {/* ============================= */}
                        {/* User Information */}
                        {/* ============================= */}

                        <div className="report-section">

                            <h3>
                                User Information
                            </h3>

                            <p>
                                <strong>
                                    Name:
                                </strong>{" "}
                                {selectedReport.user?.name ||
                                    "--"}
                            </p>

                            <p>
                                <strong>
                                    Email:
                                </strong>{" "}
                                {selectedReport.user?.email ||
                                    "--"}
                            </p>

                        </div>

                        {/* ============================= */}
                        {/* Business Description */}
                        {/* ============================= */}

                        <div className="report-section">

                            <h3>
                                Business Description
                            </h3>

                            <p>
                                {selectedReport.description ||
                                    "No description provided."}
                            </p>

                        </div>

                        {/* ============================= */}
                        {/* AI Business Analysis */}
                        {/* ============================= */}

                        <div className="report-section">

                            <h3>
                                AI Business Analysis
                            </h3>

                            <pre className="ai-report-content">

                                {typeof selectedReport.report ===
                                "object"

                                    ? JSON.stringify(
                                        selectedReport.report,
                                        null,
                                        2
                                    )

                                    : selectedReport.report ||
                                      "No AI report available."}

                            </pre>

                        </div>

                        {/* ============================= */}
                        {/* Modal Footer */}
                        {/* ============================= */}

                        <div className="report-modal-footer">

                            <button
                                className="delete-report-btn"
                                onClick={() =>
                                    handleDeleteReport(
                                        selectedReport._id
                                    )
                                }
                                disabled={
                                    deletingReport ===
                                    selectedReport._id
                                }
                            >
                                {deletingReport ===
                                selectedReport._id
                                    ? "Deleting..."
                                    : "Delete Report"}
                            </button>

                            <button
                                className="close-report-main-btn"
                                onClick={() =>
                                    setSelectedReport(null)
                                }
                            >
                                Close
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default ReportManagement;