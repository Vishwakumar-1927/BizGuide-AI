import "./About.css";
import {
  FaArrowRight,
  FaRobot,
  FaBullseye,
  FaRocket,
  FaChartLine,
  FaUsers,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaFileAlt,
  FaLightbulb,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">

      {/* ============================= */}
      {/* Hero */}
      {/* ============================= */}

      <section className="about-hero">

        <div className="about-hero-glow"></div>

        <div className="about-content">

          <div className="about-tag">
            <FaRobot />
            <span>AI POWERED BUSINESS ASSISTANT</span>
          </div>

          <h1>
            About <span>BizGuide AI</span>
          </h1>

          <p>
            BizGuide AI is an intelligent business planning platform
            that empowers aspiring entrepreneurs with AI-driven insights
            before they invest. Our goal is to help users make informed
            decisions through market analysis, investment estimation,
            competitor research, and personalized business
            recommendations.
          </p>

          <button
            className="about-btn"
            onClick={() => navigate("/analyze")}
          >
            <span>Analyze Your Business</span>
            <FaArrowRight />
          </button>

        </div>

        <div className="about-hero-visual">

          <div className="hero-orbit orbit-one"></div>
          <div className="hero-orbit orbit-two"></div>

          <div className="about-ai-card">

            <div className="ai-card-icon">
              <FaRobot />
            </div>

            <span>AI BUSINESS INTELLIGENCE</span>

            <h3>
              Turn Ideas Into
              <strong> Better Decisions</strong>
            </h3>

            <div className="ai-mini-stats">

              <div>
                <FaChartLine />
                <span>Market</span>
              </div>

              <div>
                <FaMoneyBillWave />
                <span>Finance</span>
              </div>

              <div>
                <FaLightbulb />
                <span>Strategy</span>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ============================= */}
      {/* Who We Are */}
      {/* ============================= */}

      <section className="about-intro">

        <div className="section-title">

          <div className="section-kicker">
            <FaRobot />
            <span>OUR PURPOSE</span>
          </div>

          <h2>
            Who <span>We Are</span>
          </h2>

          <p>
            Helping entrepreneurs transform business ideas into
            successful ventures using Artificial Intelligence.
          </p>

        </div>

        <div className="intro-card">

          <div className="intro-icon">
            <FaLightbulb />
          </div>

          <div className="intro-content">

            <span>BUILT FOR ENTREPRENEURS</span>

            <h3>
              Smarter planning before
              you make the investment.
            </h3>

            <p>
              Starting a business can be challenging. Entrepreneurs
              often face uncertainty regarding investment, market
              demand, competition, profitability, and business risks.
            </p>

            <p>
              BizGuide AI simplifies this process by combining
              Artificial Intelligence with business analytics to
              generate professional reports, helping users evaluate
              their ideas before making financial commitments.
            </p>

            <p>
              Whether you're launching a bakery, restaurant, medical
              shop, software company, or any other startup, BizGuide AI
              provides valuable insights to support smarter business
              decisions.
            </p>

            <div className="intro-points">

              <div>
                <FaCheckCircle />
                <span>AI-driven business insights</span>
              </div>

              <div>
                <FaCheckCircle />
                <span>Financial and market analysis</span>
              </div>

              <div>
                <FaCheckCircle />
                <span>Risk-aware recommendations</span>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ============================= */}
      {/* Mission & Vision */}
      {/* ============================= */}

      <section className="mission-vision">

        <div className="mission-card mission">

          <div className="mission-icon">
            <FaBullseye />
          </div>

          <div className="mission-content">

            <span>WHAT DRIVES US</span>

            <h3>Our Mission</h3>

            <p>
              To empower entrepreneurs with AI-driven insights that
              simplify business planning, reduce risks, and improve
              decision-making before investing.
            </p>

          </div>

        </div>

        <div className="mission-card vision">

          <div className="mission-icon">
            <FaRocket />
          </div>

          <div className="mission-content">

            <span>WHERE WE ARE GOING</span>

            <h3>Our Vision</h3>

            <p>
              To become a trusted AI-powered business planning platform
              that helps startups and small businesses grow with
              confidence and innovation.
            </p>

          </div>

        </div>

      </section>

      {/* ============================= */}
      {/* Why Choose Us */}
      {/* ============================= */}

      <section className="why-us">

        <div className="section-title">

          <div className="section-kicker">
            <FaCheckCircle />
            <span>WHY BIZGUIDE AI</span>
          </div>

          <h2>
            Built to Make Business
            <span> Decisions Smarter</span>
          </h2>

          <p>
            Everything you need to evaluate your business idea
            before taking the next step.
          </p>

        </div>

        <div className="why-grid">

          {/* AI */}

          <div className="why-card">

            <div className="why-icon">
              <FaRobot />
            </div>

            <span className="why-number">01</span>

            <h4>AI Powered</h4>

            <p>
              Advanced AI analyzes your business idea and provides
              intelligent recommendations.
            </p>

          </div>

          {/* Market */}

          <div className="why-card">

            <div className="why-icon">
              <FaChartLine />
            </div>

            <span className="why-number">02</span>

            <h4>Market Analysis</h4>

            <p>
              Understand market demand, customer behavior,
              and business opportunities.
            </p>

          </div>

          {/* Competitors */}

          <div className="why-card">

            <div className="why-icon">
              <FaUsers />
            </div>

            <span className="why-number">03</span>

            <h4>Competitor Insights</h4>

            <p>
              Learn about competitors and discover market gaps
              for better planning.
            </p>

          </div>

          {/* Investment */}

          <div className="why-card">

            <div className="why-icon">
              <FaMoneyBillWave />
            </div>

            <span className="why-number">04</span>

            <h4>Investment Planning</h4>

            <p>
              Estimate startup costs and expected returns
              before investing.
            </p>

          </div>

          {/* Risk */}

          <div className="why-card">

            <div className="why-icon">
              <FaExclamationTriangle />
            </div>

            <span className="why-number">05</span>

            <h4>Risk Assessment</h4>

            <p>
              Identify possible business risks and prepare
              strategies to overcome them.
            </p>

          </div>

          {/* Reports */}

          <div className="why-card">

            <div className="why-icon">
              <FaFileAlt />
            </div>

            <span className="why-number">06</span>

            <h4>Professional Reports</h4>

            <p>
              Receive detailed AI-generated reports to support
              confident business decisions.
            </p>

          </div>

        </div>

      </section>

      {/* ============================= */}
      {/* Final CTA */}
      {/* ============================= */}

      <section className="about-cta">

        <div className="cta-content">

          <div className="cta-icon">
            <FaRobot />
          </div>

          <div>
            <span>READY TO EXPLORE YOUR IDEA?</span>

            <h2>
              Let AI help you make
              the next business decision.
            </h2>
          </div>

        </div>

        <button
          onClick={() => navigate("/analyze")}
        >
          Analyze Your Business
          <FaArrowRight />
        </button>

      </section>

    </div>
  );
}

export default About;