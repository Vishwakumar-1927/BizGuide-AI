import "./BusinessInfo.css";

function BusinessInfo({ business }) {
  return (
    <div className="business-card">

      <h2>🏢 Business Information</h2>

      <div className="info-grid">

        <div className="info-box">
          <label>Business Name</label>
          <span>{business.businessName}</span>
        </div>

        <div className="info-box">
          <label>Category</label>
          <span>{business.category}</span>
        </div>

        <div className="info-box">
          <label>Location</label>
          <span>{business.location}</span>
        </div>

        <div className="info-box">
          <label>Budget</label>
          <span>₹ {business.budget}</span>
        </div>

      </div>

      <div className="description-box">

        <label>Description</label>

        <p>{business.description}</p>

      </div>

    </div>
  );
}

export default BusinessInfo;