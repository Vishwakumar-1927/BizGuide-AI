import "./Recommendations.css";

function Recommendations({ report }) {
  if (!report) return null;

  return (
    <section className="recommendations">

      <div className="section-header">
        <h2>7. Recommendations</h2>
      </div>

      <div className="recommendation-card">

        <div className="recommendation-item">
          <h3>📍 Recommended Location</h3>
          <p>{report.bestLocation || "Choose a location with high customer traffic."}</p>
        </div>

        <div className="recommendation-item">
          <h3>📢 Marketing Strategy</h3>
          <p>{report.marketingStrategy || "Use social media marketing and local promotions to attract customers."}</p>
        </div>

        <div className="recommendation-item">
          <h3>💰 Budget Suggestion</h3>
          <p>{report.budgetAdvice || "Allocate your budget wisely across infrastructure, inventory, and marketing."}</p>
        </div>

        <div className="recommendation-item">
          <h3>🚀 Growth Strategy</h3>
          <p>{report.growthStrategy || "Focus on customer satisfaction and gradually expand your services."}</p>
        </div>

      </div>

      <div className="recommendation-note">

        <h3>AI Recommendation</h3>

        <p>
          These recommendations are generated based on your business
          category, investment budget, location, and market analysis.
          They are intended to help improve your chances of business
          success.
        </p>

      </div>

    </section>
  );
}

export default Recommendations;