import "./CTA.css";
import { FaArrowRight } from "react-icons/fa";

function CTA() {
  return (
    <section className="cta">

      <div className="cta-content">

        <span>READY TO START?</span>

        <h2>
          Turn Your Business Idea
          <br />
          Into Reality With AI
        </h2>

        <p>
          Get instant AI-powered business insights, market analysis,
          investment planning, competitor research, and detailed reports
          to confidently launch your dream business.
        </p>

        <div className="cta-buttons">

          <button className="primary-btn">
            Analyze Business <FaArrowRight />
          </button>

          <button className="secondary-btn">
            Learn More
          </button>

        </div>

      </div>

    </section>
  );
}

export default CTA;