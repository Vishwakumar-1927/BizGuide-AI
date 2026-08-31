import "./AnalyzeForm.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClipboardList,
  FaMagic,
  FaChevronDown,
  FaCheckCircle,
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

      const response = await fetch(
        "https://bizguide-ai-backend.onrender.com/analyze",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            ...(token && {
              Authorization: `Bearer ${token}`,
            }),
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to generate report.");
        return;
      }

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
      {/* AI LOADING */}

      {loading && (
        <div className="loading-overlay">

          <div className="loading-card">

            <div className="ai-loader">
              <FaMagic />
            </div>

            <div className="loading-badge">
              AI ANALYSIS IN PROGRESS
            </div>

            <h2>
              Building Your Business Report
            </h2>

            <p>
              BizGuide AI is analyzing your business idea,
              market potential, competition and investment.
            </p>

            <div className="loading-steps">

              <span>
                <FaCheckCircle />
                Market analysis
              </span>

              <span>
                <FaCheckCircle />
                Competition research
              </span>

              <span>
                <FaCheckCircle />
                Investment analysis
              </span>

            </div>

            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>

            <small>
              Please don't close this page.
            </small>

          </div>

        </div>
      )}


      {/* FORM */}

      <form
        className="analyze-form"
        onSubmit={handleSubmit}
      >

        <div className="form-heading">

          <div className="form-heading-icon">
            ✦
          </div>

          <div>
            <span>BUSINESS ANALYSIS</span>

            <h2>
              Tell Us About Your Business
            </h2>
          </div>

        </div>


        <div className="form-divider"></div>


        {/* BUSINESS NAME */}

        <div className="form-group">

          <label>
            Business Name
            <span>*</span>
          </label>

          <div className="input-box">

            <FaBuilding className="input-icon" />

            <input
              type="text"
              name="businessName"
              placeholder="Example: Fresh Bakery"
              value={formData.businessName}
              onChange={handleChange}
            />

          </div>

        </div>


        {/* CATEGORY */}

        <div className="form-group">

          <label>
            Business Category
            <span>*</span>
          </label>

          <div className="select-box">

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >

              <option value="">
                Select your business category
              </option>

              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}

            </select>

            <FaChevronDown className="select-icon" />

          </div>

        </div>


        {/* LOCATION + BUDGET */}

        <div className="form-row">

          <div className="form-group">

            <label>
              Business Location
              <span>*</span>
            </label>

            <div className="input-box">

              <FaMapMarkerAlt className="input-icon" />

              <input
                type="text"
                name="location"
                placeholder="Example: Rajapalayam"
                value={formData.location}
                onChange={handleChange}
              />

            </div>

          </div>


          <div className="form-group">

            <label>
              Estimated Budget
              <span>*</span>
            </label>

            <div className="input-box">

              <FaMoneyBillWave className="input-icon" />

              <input
                type="number"
                name="budget"
                placeholder="Example: 800000"
                value={formData.budget}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>


        {/* DESCRIPTION */}

        <div className="form-group">

          <label>
            Business Description
            <span>*</span>
          </label>

          <div className="textarea-box">

            <FaClipboardList className="textarea-icon" />

            <textarea
              rows="5"
              name="description"
              placeholder="Describe your business idea, products or services, target customers, and anything else you think is important..."
              value={formData.description}
              onChange={handleChange}
            />

          </div>

          <small className="field-hint">
            Give AI as much detail as possible for better insights.
          </small>

        </div>


        {/* SUBMIT */}

        <button
          type="submit"
          className="generate-btn"
          disabled={loading}
        >

          <span>
            <FaMagic />
          </span>

          <div>
            <strong>
              Analyze My Business
            </strong>

            <small>
              Generate AI Business Report
            </small>
          </div>

          <FaArrowIcon />

        </button>

        <p className="form-note">
          🔒 Your business information is securely processed.
        </p>

      </form>
    </>
  );
}


/* Simple arrow component */

function FaArrowIcon() {
  return <span className="submit-arrow">→</span>;
}

export default AnalyzeForm;