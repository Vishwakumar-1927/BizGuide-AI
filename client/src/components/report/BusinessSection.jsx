import "./BusinessSection.css";
import {
  FaBuilding,
  FaTags,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaFileAlt,
} from "react-icons/fa";

function BusinessSection({ business }) {
  if (!business) return null;

  return (
    <section className="business-section">

      <div className="section-header">
        <h2>Business Information</h2>
        <p>
          Basic details about the proposed business.
        </p>
      </div>

      <div className="business-grid">

        <div className="info-card">

          <div className="info-icon blue">
            <FaBuilding />
          </div>

          <div className="info-content">
            <span>Business Name</span>
            <h3>{business.businessName}</h3>
          </div>

        </div>

        <div className="info-card">

          <div className="info-icon green">
            <FaTags />
          </div>

          <div className="info-content">
            <span>Category</span>
            <h3>{business.category}</h3>
          </div>

        </div>

        <div className="info-card">

          <div className="info-icon orange">
            <FaMapMarkerAlt />
          </div>

          <div className="info-content">
            <span>Location</span>
            <h3>{business.location}</h3>
          </div>

        </div>

        <div className="info-card">

          <div className="info-icon purple">
            <FaMoneyBillWave />
          </div>

          <div className="info-content">
            <span>Investment</span>
            <h3>{business.budget}</h3>
          </div>

        </div>

      </div>

      <div className="description-card">

        <div className="description-header">

          <FaFileAlt />

          <h3>Business Description</h3>

        </div>

        <p>
          {business.description}
        </p>

      </div>

    </section>
  );
}

export default BusinessSection;