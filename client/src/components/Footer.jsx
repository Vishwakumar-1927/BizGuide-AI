import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* =========================
            BRAND
        ========================= */}

        <div className="footer-brand">

          <div
            className="footer-logo"
            onClick={() => navigate("/")}
          >

            <div className="footer-logo-icon">
              ✦
            </div>

            <div>
              <strong>BizGuide</strong>
              <span>AI</span>
            </div>

          </div>

          <p>
            Your AI-powered business companion for validating ideas,
            understanding markets, planning investments, and making
            smarter business decisions.
          </p>

          <div className="footer-socials">

            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>

            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>

            <a href="#" aria-label="GitHub">
              <FaGithub />
            </a>

          </div>

        </div>


        {/* =========================
            PRODUCT
        ========================= */}

        <div className="footer-column">

          <h3>Product</h3>

          <button onClick={() => navigate("/")}>
            Home
          </button>

          <button onClick={() => navigate("/analyze")}>
            Business Analysis
          </button>

          <button onClick={() => navigate("/history")}>
            Reports
          </button>

          <button onClick={() => navigate("/about")}>
            About BizGuide
          </button>

        </div>


        {/* =========================
            SERVICES
        ========================= */}

        <div className="footer-column">

          <h3>Services</h3>

          <span>Market Analysis</span>

          <span>Investment Planning</span>

          <span>Competitor Research</span>

          <span>Location Intelligence</span>

        </div>


        {/* =========================
            CONTACT
        ========================= */}

        <div className="footer-column footer-contact">

          <h3>Get In Touch</h3>

          <div className="contact-item">

            <div>
              <FaEnvelope />
            </div>

            <span>
              bizguideai@gmail.com
            </span>

          </div>

          <div className="contact-item">

            <div>
              <FaPhoneAlt />
            </div>

            <span>
              +91 6369121647
            </span>

          </div>

          <div className="contact-item">

            <div>
              <FaMapMarkerAlt />
            </div>

            <span>
              Rajapalayam, Tamil Nadu, India
            </span>

          </div>

        </div>

      </div>


      {/* =========================
          BOTTOM CTA
      ========================= */}

      <div className="footer-cta">

        <div>

          <strong>
            Ready to validate your business idea?
          </strong>

          <span>
            Get AI-powered insights in minutes.
          </span>

        </div>

        <button onClick={() => navigate("/analyze")}>

          Start Analysis

          <FaArrowRight />

        </button>

      </div>


      {/* =========================
          COPYRIGHT
      ========================= */}

      <div className="footer-bottom">

        <p>
          © 2026 BizGuide AI. All Rights Reserved.
        </p>

        <span>
          Built with AI for entrepreneurs
        </span>

      </div>

    </footer>
  );
}

export default Footer;