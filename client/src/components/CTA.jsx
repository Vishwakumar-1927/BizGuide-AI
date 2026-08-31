import "./CTA.css";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaSparkles } from "react-icons/fa6";

function CTA() {
  const navigate = useNavigate();

  return (
    <section className="cta">

      <div className="cta-glow cta-glow-one"></div>
      <div className="cta-glow cta-glow-two"></div>

      <div className="cta-content">

        <div className="cta-badge">
          <FaSparkles />
          <span>READY TO BUILD?</span>
        </div>

        <h2>
          Your Next Business
          <span> Starts With an Idea.</span>
        </h2>

        <p>
          Turn your idea into a smarter business plan with AI-powered
          market insights, investment planning, competitor analysis,
          location intelligence, and detailed business reports.
        </p>

        <div className="cta-buttons">

          <button
            className="cta-primary"
            onClick={() => navigate("/analyze")}
          >
            <span>Start Free Analysis</span>
            <FaArrowRight />
          </button>

          <button
            className="cta-secondary"
            onClick={() => navigate("/history")}
          >
            View My Reports
          </button>

        </div>

        <div className="cta-trust">

          <span>✓ No complicated setup</span>
          <span>✓ AI-powered insights</span>
          <span>✓ Generate reports in minutes</span>

        </div>

      </div>

    </section>
  );
}

export default CTA;