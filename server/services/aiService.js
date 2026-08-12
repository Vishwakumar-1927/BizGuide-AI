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
3. Do NOT wrap the JSON inside \`\`\`.
4. Do NOT include explanations.
5. Every field must contain meaningful business information.
6. Give practical and realistic business suggestions.
7. Estimate financial values based on the given budget.
8. SWOT analysis should contain at least 3 points in each category.
9. Recommendations should be practical.
10. Business score must be a NUMBER between 0 and 100.

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

        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
        });

        console.log("========== GEMINI RESPONSE ==========");
        console.dir(response, { depth: null });

        let aiText = "";

        if (
            response.candidates &&
            response.candidates.length > 0 &&
            response.candidates[0].content &&
            response.candidates[0].content.parts &&
            response.candidates[0].content.parts.length > 0
        ) {
            aiText = response.candidates[0].content.parts[0].text;
        } else {
            throw new Error("Unable to extract AI response.");
        }

        aiText = aiText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        console.log("\n========== AI TEXT ==========");
        console.log(aiText);

        const report = JSON.parse(aiText);

        return report;

    } catch (error) {

        console.error("\n========== GEMINI ERROR ==========");
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