import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}

        <div className="footer-section">

          <h2>BizGuide AI</h2>

          <p>
            AI-powered business guidance platform that helps entrepreneurs
            validate ideas, analyze markets, estimate investments, and
            generate intelligent business reports.
          </p>

          <div className="social-icons">

            <a href="#"><FaFacebookF /></a>

            <a href="#"><FaTwitter /></a>

            <a href="#"><FaLinkedinIn /></a>

            <a href="#"><FaGithub /></a>

          </div>

        </div>

        {/* Quick Links */}

        <div className="footer-section">

          <h3>Quick Links</h3>

          <ul>

            <li><a href="/">Home</a></li>

            <li><a href="/analyze">Analyze</a></li>

            <li><a href="/report">Reports</a></li>

            <li><a href="/about">About</a></li>

          </ul>

        </div>

        {/* Resources */}

        <div className="footer-section">

          <h3>Resources</h3>

          <ul>

            <li>Market Research</li>

            <li>Business Planning</li>

            <li>Investment Guide</li>

            <li>Startup Support</li>

          </ul>

        </div>

        {/* Contact */}

        <div className="footer-section">

          <h3>Contact</h3>

          <p><FaEnvelope /> bizguideai@gmail.com</p>

          <p><FaPhoneAlt /> +91 6369121647</p>

          <p><FaMapMarkerAlt /> Rajapalayam, Tamil Nadu, India</p>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 BizGuide AI. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;