import "./BusinessSection.css";

import {
  FaBuilding,
  FaTags,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaFileAlt,
  FaCheckCircle,
} from "react-icons/fa";

function BusinessSection({ business }) {
  if (!business) return null;

  const details = [
    {
      icon: <FaBuilding />,
      label: "Business Name",
      value: business.businessName,
    },
    {
      icon: <FaTags />,
      label: "Category",
      value: business.category,
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: business.location,
    },
    {
      icon: <FaMoneyBillWave />,
      label: "Investment",
      value: business.budget,
    },
  ];

  return (
    <section className="business-section">

      {/* SECTION HEADER */}

      <div className="section-header">

        <div className="section-title-row">

          <div className="section-title-icon">
            <FaBuilding />
          </div>

          <div>
            <span>BUSINESS OVERVIEW</span>

            <h2>Business Information</h2>
          </div>

        </div>

        <div className="verified-badge">
          <FaCheckCircle />
          Details Provided
        </div>

      </div>


      {/* BUSINESS DETAILS */}

      <div className="business-grid">

        {details.map((item, index) => (

          <div
            className="info-card"
            key={index}
          >

            <div className="info-icon">
              {item.icon}
            </div>

            <div className="info-content">

              <span>
                {item.label}
              </span>

              <h3>
                {item.value || "Not provided"}
              </h3>

            </div>

          </div>

        ))}

      </div>


      {/* DESCRIPTION */}

      <div className="description-card">

        <div className="description-header">

          <div className="description-icon">
            <FaFileAlt />
          </div>

          <div>
            <span>BUSINESS IDEA</span>

            <h3>Business Description</h3>
          </div>

        </div>

        <p>
          {business.description || "No description provided."}
        </p>

      </div>

    </section>
  );
}

export default BusinessSection;