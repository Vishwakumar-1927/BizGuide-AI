import "./About.css";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">

      {/* ================= Hero Section ================= */}

      <section className="about-hero">

        <div className="about-content">

          <span className="about-tag">
            🤖 AI Powered Business Assistant
          </span>

          <h1>
            About <span>BizGuide AI</span>
          </h1>

          <p>
            BizGuide AI is an intelligent business planning platform that
            empowers aspiring entrepreneurs with AI-driven insights before
            they invest. Our goal is to help users make informed decisions
            through market analysis, investment estimation, competitor
            research, and personalized business recommendations.
          </p>

          <button
            className="about-btn"
            onClick={() => navigate("/analyze")}
          >
            Analyze Your Business
            <FaArrowRight />
          </button>

        </div>

      </section>

      {/* ================= About Section ================= */}

      <section className="about-intro">

        <div className="section-title">

          <h2>Who We Are</h2>

          <p>
            Helping entrepreneurs transform business ideas into successful
            ventures using Artificial Intelligence.
          </p>

        </div>

        <div className="intro-card">

          <p>
            Starting a business can be challenging. Entrepreneurs often face
            uncertainty regarding investment, market demand, competition,
            profitability, and business risks.

            <br /><br />

            BizGuide AI simplifies this process by combining Artificial
            Intelligence with business analytics to generate professional
            reports, helping users evaluate their ideas before making
            financial commitments.

            <br /><br />

            Whether you're launching a bakery, restaurant, medical shop,
            software company, or any other startup, BizGuide AI provides
            valuable insights to support smarter business decisions.
          </p>

        </div>

      </section>

      {/* ================= Mission & Vision ================= */}

      <section className="mission-vision">

        <div className="mission-card">

          <div className="icon">🎯</div>

          <h3>Our Mission</h3>

          <p>
            To empower entrepreneurs with AI-driven insights that simplify
            business planning, reduce risks, and improve decision-making
            before investing.
          </p>

        </div>

        <div className="mission-card">

          <div className="icon">🚀</div>

          <h3>Our Vision</h3>

          <p>
            To become a trusted AI-powered business planning platform that
            helps startups and small businesses grow with confidence and
            innovation.
          </p>

        </div>

      </section>

      {/* ================= Why Choose Us ================= */}

      <section className="why-us">

        <div className="section-title">

          <h2>Why Choose BizGuide AI?</h2>

          <p>
            Helping entrepreneurs make smarter business decisions through
            Artificial Intelligence.
          </p>

        </div>

        <div className="why-grid">

          <div className="why-card">
            <span>🤖</span>
            <h4>AI Powered</h4>
            <p>
              Advanced AI analyzes your business idea and provides
              intelligent recommendations.
            </p>
          </div>

          <div className="why-card">
            <span>📈</span>
            <h4>Market Analysis</h4>
            <p>
              Understand market demand, customer behavior,
              and business opportunities.
            </p>
          </div>

          <div className="why-card">
            <span>👥</span>
            <h4>Competitor Insights</h4>
            <p>
              Learn about competitors and discover market
              gaps for better planning.
            </p>
          </div>

          <div className="why-card">
            <span>💰</span>
            <h4>Investment Planning</h4>
            <p>
              Estimate startup costs and expected returns
              before investing.
            </p>
          </div>

          <div className="why-card">
            <span>⚠️</span>
            <h4>Risk Assessment</h4>
            <p>
              Identify possible business risks and prepare
              strategies to overcome them.
            </p>
          </div>

          <div className="why-card">
            <span>📄</span>
            <h4>Professional Reports</h4>
            <p>
              Receive detailed AI-generated reports to
              support confident business decisions.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default About;