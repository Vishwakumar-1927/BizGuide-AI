import "./Hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">

      <div className="hero-container">

        {/* LEFT */}

        <div className="hero-left">

          <span className="hero-tag">
            🚀 AI Powered Business Planning
          </span>

          <h1>
            Build Your Dream
            <span> Business </span>
            With AI
          </h1>

          <p>
            BizGuide AI helps entrepreneurs validate ideas, estimate investment,
            analyze competitors, discover profitable locations, and generate
            professional AI-powered business reports in minutes.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/analyze")}
            >
              Start Free Analysis
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/history")}
            >
              View Reports
            </button>

          </div>

          <div className="hero-stats">

            <div>

              <h2>1500+</h2>

              <span>Reports</span>

            </div>

            <div>

              <h2>95%</h2>

              <span>Accuracy</span>

            </div>

            <div>

              <h2>24/7</h2>

              <span>AI Support</span>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="hero-right">

          <div className="dashboard">

            <div className="dashboard-header">

              <h3>📊 AI Business Dashboard</h3>

              <span className="live">
                ● LIVE
              </span>

            </div>

            <div className="dashboard-body">

              <div className="item">

                <span>Market Demand</span>

                <strong>High 📈</strong>

              </div>

              <div className="item">

                <span>Competition</span>

                <strong>Medium ⚖️</strong>

              </div>

              <div className="item">

                <span>Investment</span>

                <strong>₹8 Lakhs</strong>

              </div>

              <div className="item">

                <span>Expected Profit</span>

                <strong>₹2.3L / Month</strong>

              </div>

            </div>

            <div className="score-box">

              <span>Business Score</span>

              <h1>87</h1>

              <small>/100</small>

            </div>

          </div>

          <div className="floating-card card1">

            📍 Best Location
            <br />
            Madurai

          </div>

          <div className="floating-card card2">

            💰 ROI
            <br />
            18 Months

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;