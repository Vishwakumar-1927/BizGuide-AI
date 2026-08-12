import "./AnalysisInfo.css";

import {
  FaChartLine,
  FaUsers,
  FaMoneyBillWave,
  FaShieldAlt,
  FaLightbulb,
  FaMapMarkerAlt,
  FaBullseye,
  FaRobot,
} from "react-icons/fa";

function AnalysisInfo() {
  return (
    <div className="analysis-card">

      <div className="analysis-header">
        <span>🤖 AI Powered Business Analysis</span>

        <h2>What BizGuide AI Can Do</h2>

        <p>
          Enter your business idea and let AI analyze market potential,
          investment, competition, risks, and growth opportunities to help
          you make better business decisions.
        </p>
      </div>

      <div className="analysis-list">

        <div className="analysis-item">
          <FaChartLine className="analysis-icon" />
          <div>
            <h4>Market Analysis</h4>
            <p>
              Analyze customer demand, market trends, and business opportunities.
            </p>
          </div>
        </div>

        <div className="analysis-item">
          <FaUsers className="analysis-icon" />
          <div>
            <h4>Competitor Analysis</h4>
            <p>
              Discover competitors and identify gaps to gain a competitive
              advantage.
            </p>
          </div>
        </div>

        <div className="analysis-item">
          <FaMoneyBillWave className="analysis-icon" />
          <div>
            <h4>Investment Estimation</h4>
            <p>
              Get an estimated startup cost, expected profit, and financial
              planning insights.
            </p>
          </div>
        </div>

        <div className="analysis-item">
          <FaShieldAlt className="analysis-icon" />
          <div>
            <h4>Risk Assessment</h4>
            <p>
              Understand possible business risks before making your investment.
            </p>
          </div>
        </div>

        <div className="analysis-item">
          <FaMapMarkerAlt className="analysis-icon" />
          <div>
            <h4>Location Suggestions</h4>
            <p>
              Receive AI recommendations for suitable business locations based
              on your selected city and category.
            </p>
          </div>
        </div>

        <div className="analysis-item">
          <FaBullseye className="analysis-icon" />
          <div>
            <h4>Business Success Prediction</h4>
            <p>
              View an estimated success rate using market demand, competition,
              and investment analysis.
            </p>
          </div>
        </div>

      </div>

      <div className="analysis-tip">
        <FaRobot />

        <div>
          <strong>AI Tip</strong>
          <p>
            You can also choose from our <strong>Suggested Business Ideas</strong>
            if you're unsure what business to start. BizGuide AI will generate a
            personalized report with recommendations, SWOT analysis, financial
            insights, and a business roadmap.
          </p>
        </div>

      </div>

    </div>
  );
}

export default AnalysisInfo;