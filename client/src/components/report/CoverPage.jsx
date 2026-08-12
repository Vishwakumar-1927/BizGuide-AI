import "./CoverPage.css";

function CoverPage({ business }) {
  if (!business) return null;

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="cover-page">

      <div className="cover-content">

        <h3 className="company-name">🚀 BizGuide AI</h3>

        <h1>BUSINESS ANALYSIS REPORT</h1>

        <p className="subtitle">
          AI Powered Business Intelligence Platform
        </p>

        <div className="line"></div>

        <div className="business-details">

          <div className="detail-row">
            <span>Business Name</span>
            <strong>{business.businessName}</strong>
          </div>

          <div className="detail-row">
            <span>Category</span>
            <strong>{business.category}</strong>
          </div>

          <div className="detail-row">
            <span>Location</span>
            <strong>{business.location}</strong>
          </div>

          <div className="detail-row">
            <span>Investment</span>
            <strong>₹ {business.budget}</strong>
          </div>

          <div className="detail-row">
            <span>Generated On</span>
            <strong>{today}</strong>
          </div>

        </div>

        <div className="line"></div>

        <div className="footer-text">
          Prepared by BizGuide AI <br />
          Your AI Business Consultant
        </div>

      </div>

    </section>
  );
}

export default CoverPage;