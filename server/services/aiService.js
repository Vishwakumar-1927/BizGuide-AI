const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function generateBusinessReport(data) {
    try {

        const prompt = `
You are an experienced business consultant with expertise in:

- Market Research
- Financial Analysis
- SWOT Analysis
- Risk Assessment
- Marketing Strategy
- Startup Planning

Analyze the following business idea.

Business Name: ${data.businessName}
Business Category: ${data.category}
Location: ${data.location}
Budget: ₹${data.budget}
Description: ${data.description}

Generate a detailed professional business feasibility report.

IMPORTANT RULES:

1. Return ONLY valid JSON.
2. Do NOT use Markdown.
3. Do NOT wrap the JSON inside code fences.
4. Do NOT include explanations outside the JSON.
5. Every field must contain meaningful business information.
6. Give practical and realistic business suggestions.
7. Estimate financial values based on the given budget.
8. SWOT analysis must contain at least 3 points in each category.
9. Recommendations must be practical.
10. Business score must be a NUMBER between 0 and 100.
11. Do not leave fields empty.
12. Keep all field names exactly as provided below.

Return JSON in EXACTLY this format:

{
  "summary": "",

  "marketAnalysis": {
    "marketDemand": "",
    "competition": "",
    "targetCustomers": "",
    "bestLocation": ""
  },

  "financialAnalysis": {
    "investmentAnalysis": "",
    "estimatedRevenue": "",
    "estimatedProfit": "",
    "profitMargin": "",
    "breakEvenPeriod": ""
  },

  "swotAnalysis": {
    "strengths": [
      "",
      "",
      ""
    ],
    "weaknesses": [
      "",
      "",
      ""
    ],
    "opportunities": [
      "",
      "",
      ""
    ],
    "threats": [
      "",
      "",
      ""
    ]
  },

  "riskAssessment": {
    "riskLevel": "",
    "financialRisk": "",
    "marketRisk": "",
    "operationalRisk": "",
    "legalRisk": "",
    "summary": ""
  },

  "recommendations": {
    "marketing": [
      "",
      ""
    ],
    "operations": [
      "",
      ""
    ],
    "financial": [
      "",
      ""
    ]
  },

  "finalVerdict": {
    "businessScore": 0,
    "decision": "",
    "reason": ""
  }
}
`;

        console.log("========== STARTING GEMINI ANALYSIS ==========");

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        // Official SDK response text
        let aiText = response.text;

        if (!aiText) {
            throw new Error("Gemini returned an empty response.");
        }

        console.log("========== GEMINI TEXT RECEIVED ==========");
        console.log(aiText);

        // Remove possible Markdown code fences
        aiText = aiText
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        // Find JSON object if Gemini adds accidental text
        const startIndex = aiText.indexOf("{");
        const endIndex = aiText.lastIndexOf("}");

        if (startIndex === -1 || endIndex === -1) {
            throw new Error("Gemini response does not contain valid JSON.");
        }

        aiText = aiText.substring(
            startIndex,
            endIndex + 1
        );

        const report = JSON.parse(aiText);

        console.log("========== REPORT PARSED SUCCESSFULLY ==========");

        return report;

    } catch (error) {

        console.error("========== GEMINI ERROR ==========");
        console.error(error);

        return {
            summary: "Unable to generate business report.",

            marketAnalysis: {
                marketDemand: "Unavailable",
                competition: "Unavailable",
                targetCustomers: "Unavailable",
                bestLocation: "Unavailable"
            },

            financialAnalysis: {
                investmentAnalysis: "Unavailable",
                estimatedRevenue: "Unavailable",
                estimatedProfit: "Unavailable",
                profitMargin: "Unavailable",
                breakEvenPeriod: "Unavailable"
            },

            swotAnalysis: {
                strengths: [],
                weaknesses: [],
                opportunities: [],
                threats: []
            },

            riskAssessment: {
                riskLevel: "Unknown",
                financialRisk: "Unavailable",
                marketRisk: "Unavailable",
                operationalRisk: "Unavailable",
                legalRisk: "Unavailable",
                summary: "Unavailable"
            },

            recommendations: {
                marketing: [],
                operations: [],
                financial: []
            },

            finalVerdict: {
                businessScore: 0,
                decision: "Not Available",
                reason: "Unable to generate business report."
            }
        };
    }
}

module.exports = {
    generateBusinessReport,
};