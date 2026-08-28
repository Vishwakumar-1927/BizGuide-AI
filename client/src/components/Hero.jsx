import "./Hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-glow hero-glow-one"></div>
      <div className="hero-glow hero-glow-two"></div>

      <div className="hero-container">

        {/* LEFT SIDE */}
        <div className="hero-left">

          <div className="hero-tag">
            <span className="tag-dot"></span>
            AI-Powered Business Planning
          </div>

          <h1>
            Turn Your
            <span> Business Idea </span>
            Into Reality
          </h1>

          <p>
            BizGuide AI helps entrepreneurs validate ideas, estimate
            investment, analyze competitors, discover profitable locations,
            and generate intelligent business reports in minutes.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/analyze")}
            >
              <span>Start Free Analysis</span>
              <span className="btn-arrow">→</span>
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/history")}
            >
              <span className="report-icon">▣</span>
              View Reports
            </button>

          </div>

          <div className="hero-trust">

            <div className="trust-item">
              <strong>1,500+</strong>
              <span>AI Reports</span>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <strong>95%</strong>
              <span>Accuracy</span>
            </div>

            <div className="trust-divider"></div>

            <div className="trust-item">
              <strong>24/7</strong>
              <span>AI Support</span>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="hero-right">

          <div className="dashboard">

            <div className="dashboard-top">

              <div className="dashboard-title">
                <div className="dashboard-icon">✦</div>

                <div>
                  <h3>Business Intelligence</h3>
                  <span>AI Analysis</span>
                </div>
              </div>

              <div className="live">
                <span></span>
                LIVE
              </div>

            </div>

            <div className="dashboard-content">

              <div className="analysis-item">
                <div>
                  <span className="analysis-label">
                    Market Demand
                  </span>

                  <div className="progress">
                    <div
                      className="progress-fill demand"
                      style={{ width: "88%" }}
                    ></div>
                  </div>
                </div>

                <strong>88%</strong>
              </div>

              <div className="analysis-item">
                <div>
                  <span className="analysis-label">
                    Competition
                  </span>

                  <div className="progress">
                    <div
                      className="progress-fill competition"
                      style={{ width: "58%" }}
                    ></div>
                  </div>
                </div>

                <strong>Medium</strong>
              </div>

              <div className="money-row">

                <div className="money-card">
                  <span>Investment</span>
                  <strong>₹8L</strong>
                </div>

                <div className="money-card">
                  <span>Monthly Profit</span>
                  <strong>₹2.3L</strong>
                </div>

              </div>

            </div>

            <div className="score-section">

              <div className="score-circle">
                <div className="score-inner">
                  <strong>87</strong>
                  <span>/100</span>
                </div>
              </div>

              <div className="score-info">
                <span>Business Score</span>
                <strong>Excellent Potential</strong>
                <small>Based on AI analysis</small>
              </div>

            </div>

          </div>

          {/* FLOATING CARDS */}

          <div className="floating-card location-card">

            <div className="floating-icon location-icon">
              📍
            </div>

            <div>
              <span>Best Location</span>
              <strong>Madurai</strong>
            </div>

          </div>

          <div className="floating-card roi-card">

            <div className="floating-icon roi-icon">
              ↗
            </div>

            <div>
              <span>Expected ROI</span>
              <strong>18 Months</strong>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;