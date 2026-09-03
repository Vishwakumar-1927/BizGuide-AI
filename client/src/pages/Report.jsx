import { Navigate, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import "./Report.css";

import ReportHeader from "../components/ReportHeader";
import BusinessSection from "../components/report/BusinessSection";
import ExecutiveSummary from "../components/report/ExecutiveSummary";
import MarketAnalysis from "../components/report/MarketAnalysis";
import BusinessDashboard from "../components/report/BusinessDashboard";
import FinancialAnalysis from "../components/report/FinancialAnalysis";
import SWOTAnalysis from "../components/report/SWOTAnalysis";
import RiskAssessment from "../components/report/RiskAssessment";
import Recommendations from "../components/report/Recommendations";
import FinalVerdict from "../components/report/FinalVerdict";

function Report() {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to="/analyze" replace />;
  }

  const { business, report } = location.state;

  const downloadPDF = async () => {
    const input = document.getElementById("report-content");

    if (!input) return;

    try {
      const canvas = await html2canvas(input, {
        scale: 1.2,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollY: -window.scrollY,
        logging: false,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const pageWidth = 210;
      const pageHeight = 297;

      const canvasWidth = canvas.width;

      // Calculate the pixel height that matches one A4 page
      const pagePixelHeight = Math.floor(
        canvasWidth * (pageHeight / pageWidth)
      );

      let currentY = 0;
      let pageNumber = 0;

      while (currentY < canvas.height) {
        const remainingHeight = canvas.height - currentY;

        const sliceHeight = Math.min(
          pagePixelHeight,
          remainingHeight
        );

        // Create a separate canvas for the current page
        const pageCanvas = document.createElement("canvas");

        pageCanvas.width = canvasWidth;
        pageCanvas.height = sliceHeight;

        const pageContext = pageCanvas.getContext("2d");

        if (!pageContext) {
          throw new Error("Unable to create PDF page canvas.");
        }

        // White background
        pageContext.fillStyle = "#ffffff";

        pageContext.fillRect(
          0,
          0,
          pageCanvas.width,
          pageCanvas.height
        );

        // Copy only the current section of the report
        pageContext.drawImage(
          canvas,
          0,
          currentY,
          canvasWidth,
          sliceHeight,
          0,
          0,
          canvasWidth,
          sliceHeight
        );

        // Compress each page separately
        const pageImage = pageCanvas.toDataURL(
          "image/jpeg",
          0.65
        );

        // Add a new PDF page after the first page
        if (pageNumber > 0) {
          pdf.addPage();
        }

        const pageImageHeight =
          (sliceHeight / canvasWidth) * pageWidth;

        pdf.addImage(
          pageImage,
          "JPEG",
          0,
          0,
          pageWidth,
          pageImageHeight,
          undefined,
          "FAST"
        );

        currentY += sliceHeight;
        pageNumber++;
      }

      pdf.save(
        `${business.businessName || "BizGuide"}_Business_Report.pdf`
      );
    } catch (error) {
      console.error("PDF generation failed:", error);

      alert(
        "Unable to generate PDF. Please try again."
      );
    }
  };

  return (
    <div className="report-page">

      {/* ========================= */}
      {/* REPORT TOOLBAR */}
      {/* ========================= */}

      <div className="report-toolbar">

        <div className="report-toolbar-info">
          <span>BUSINESS INTELLIGENCE</span>

          <strong>
            AI Analysis Report
          </strong>
        </div>

        <button
          className="download-btn"
          onClick={downloadPDF}
        >
          <span className="download-icon">
            ↓
          </span>

          Download PDF Report
        </button>

      </div>

      {/* ========================= */}
      {/* REPORT DOCUMENT */}
      {/* ========================= */}

      <main id="report-content">

        <div className="report-document-header">

          <span>
            BIZGUIDE AI
          </span>

          <div className="document-line" />

          <small>
            BUSINESS ANALYSIS REPORT
          </small>

        </div>

        <ReportHeader
          business={business}
        />

        <BusinessSection
          business={business}
        />

        <ExecutiveSummary
          report={report}
        />

        <BusinessDashboard
          report={report}
        />

        <MarketAnalysis
          report={report}
        />

        <FinancialAnalysis
          report={report}
        />

        <SWOTAnalysis
          report={report}
        />

        <RiskAssessment
          report={report}
        />

        <Recommendations
          report={report}
        />

        <FinalVerdict
          report={report}
        />

        <div className="report-end">

          <div className="report-end-icon">
            ✦
          </div>

          <h3>
            End of Business Analysis
          </h3>

          <p>
            Generated by BizGuide AI using
            AI-powered business intelligence.
          </p>

        </div>

      </main>

    </div>
  );
}

export default Report;