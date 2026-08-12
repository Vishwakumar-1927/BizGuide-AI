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

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;

      pdf.addPage();

      pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pageHeight;
    }

    pdf.save(
      `${business.businessName || "BizGuide"}_Business_Report.pdf`
    );
  };

  return (
    <div className="report-page">

      <div className="download-container">
        <button
          className="download-btn"
          onClick={downloadPDF}
        >
          📄 Download PDF Report
        </button>
      </div>

      <div id="report-content">

        <ReportHeader business={business} />

        <BusinessSection business={business} />

        <ExecutiveSummary report={report} />
        
        <BusinessDashboard report={report} />
    
        <MarketAnalysis report={report} />

        <FinancialAnalysis report={report} />

        <SWOTAnalysis report={report} />

        <RiskAssessment report={report} />

        <Recommendations report={report} />

        <FinalVerdict report={report} />

      </div>

    </div>
  );
}

export default Report;