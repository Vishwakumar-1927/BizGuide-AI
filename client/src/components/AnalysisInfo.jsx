import "./AnalysisInfo.css";

import {
  FaChartLine,
  FaUsers,
  FaMoneyBillWave,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaBullseye,
  FaRobot,
  FaArrowRight,
} from "react-icons/fa";

function AnalysisInfo() {
  const analysisItems = [
    {
      icon: <FaChartLine />,
      title: "Market Analysis",
      desc: "Understand demand, trends, and potential opportunities.",
    },
    {
      icon: <FaUsers />,
      title: "Competitor Analysis",
      desc: "Identify competitors and discover market gaps.",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Investment Planning",
      desc: "Estimate startup costs, profit potential, and ROI.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Risk Assessment",
      desc: "Identify potential challenges before investing.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location Intelligence",
      desc: "Find suitable locations for your business category.",
    },
    {
      icon: <FaBullseye />,
      title: "Success Prediction",
      desc: "Get an estimated business success score.",
    },
  ];

  return (
    <aside className="analysis-card">

      {/* HEADER */}

      <div className="analysis-header">

        <div className="analysis-ai-badge">
          <FaRobot />
          <span>AI POWERED</span>
        </div>

        <h2>
          What We
          <span> Analyze</span>
        </h2>

        <p>
          BizGuide AI evaluates the most important factors behind a
          business idea and turns them into practical insights.
        </p>

      </div>


      {/* ANALYSIS ITEMS */}

      <div className="analysis-list">

        {analysisItems.map((item, index) => (

          <div
            className="analysis-item"
            key={index}
          >

            <div className="analysis-item-icon">
              {item.icon}
            </div>

            <div className="analysis-item-content">

              <h4>
                {item.title}
              </h4>

              <p>
                {item.desc}
              </p>

            </div>

            <FaArrowRight className="analysis-arrow" />

          </div>

        ))}

      </div>


      {/* AI TIP */}

      <div className="analysis-tip">

        <div className="tip-icon">
          <FaRobot />
        </div>

        <div className="tip-content">

          <strong>
            AI Tip
          </strong>

          <p>
            Not sure what to enter? Use the
            <b> Suggested Business Ideas </b>
            to quickly choose a category and start your analysis.
          </p>

        </div>

      </div>

    </aside>
  );
}

export default AnalysisInfo;