import "./AnalyzeForm.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClipboardList,
  FaMagic,
} from "react-icons/fa";

function AnalyzeForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    location: "",
    budget: "",
    description: "",
  });

  const categories = [
    "Bakery",
    "Restaurant",
    "Medical Shop",
    "Cafe",
    "Retail Store",
    "IT Startup",
    "Gym",
    "Education",
    "Others",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const freeAnalysisUsed = localStorage.getItem("freeAnalysisUsed");

    // Free analysis for guest users
    if (!token && freeAnalysisUsed) {
      alert(
        "🎉 Your free AI analysis has already been used.\n\nPlease Login or Register to continue."
      );

      navigate("/login");
      return;
    }

    if (
      !formData.businessName ||
      !formData.category ||
      !formData.location ||
      !formData.budget ||
      !formData.description
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to generate report.");
        return;
      }

      // Save free analysis
      if (!token) {
        localStorage.setItem("freeAnalysisUsed", "true");
      }

      navigate("/report", {
        state: data,
      });

    } catch (error) {

      console.error(error);

      alert("Unable to connect to server.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="loading-card">

            <div className="loader"></div>

            <h2>🤖 BizGuide AI</h2>

            <p>Analyzing your business idea...</p>

            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>

            <span>
              Please wait while AI generates your business report.
            </span>

          </div>
        </div>
      )}

      <form className="analyze-form" onSubmit={handleSubmit}>

        <h2>Business Details</h2>

        <div className="form-group">
          <label>Business Name</label>

          <div className="input-box">

            <FaBuilding className="input-icon" />

            <input
              type="text"
              name="businessName"
              placeholder="Fresh Bakery"
              value={formData.businessName}
              onChange={handleChange}
            />

          </div>
        </div>

        <div className="form-group">

          <label>Business Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >

            <option value="">Select Category</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}

          </select>

        </div>

        <div className="form-group">

          <label>Location</label>

          <div className="input-box">

            <FaMapMarkerAlt className="input-icon" />

            <input
              type="text"
              name="location"
              placeholder="Rajapalayam"
              value={formData.location}
              onChange={handleChange}
            />

          </div>

        </div>

        <div className="form-group">

          <label>Estimated Budget (₹)</label>

          <div className="input-box">

            <FaMoneyBillWave className="input-icon" />

            <input
              type="number"
              name="budget"
              placeholder="800000"
              value={formData.budget}
              onChange={handleChange}
            />

          </div>

        </div>

        <div className="form-group">

          <label>Business Description</label>

          <div className="textarea-box">

            <FaClipboardList className="textarea-icon" />

            <textarea
              rows="5"
              name="description"
              placeholder="Describe your business idea..."
              value={formData.description}
              onChange={handleChange}
            />

          </div>

        </div>

        <button
          type="submit"
          className="generate-btn"
          disabled={loading}
        >

          <FaMagic />

          {loading
            ? " Generating AI Report..."
            : " Analyze with AI"}

        </button>

      </form>
    </>
  );
}

export default AnalyzeForm;