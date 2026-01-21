import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

/**
 * Analyzes JSON structure and suggests improvements using Gemini.
 * @param {Object|Array} jsonData The JSON data to analyze.
 * @returns {Promise<Object>} Suggestions for column headers or data cleaning.
 */
export const analyzeJsonStructure = async (jsonData) => {
  if (!genAI) {
    console.warn("Gemini API Key not found");
    return { suggestions: [], status: 'no_key' };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Sample the data to avoid token limits
    const sample = Array.isArray(jsonData) ? jsonData.slice(0, 3) : jsonData;
    const prompt = `
      Analyze this JSON data sample and provide suggestions for converting it to Excel.
      1. Identify nested fields that should be flattened.
      2. Suggest user-friendly column headers for key fields (e.g., "user.profile.name" -> "User Name").
      3. Identify any potential data quality issues (mixed types, missing fields).
      
      Return ONLY valid JSON in this format:
      {
        "flatten_suggestions": ["field1", "field2"],
        "header_mapping": {"old_key": "New Header"},
        "analysis_summary": "One sentence summary of the data structure."
      }

      Data: ${JSON.stringify(sample)}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean markdown code blocks if present
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '');
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return { error: error.message, status: 'failed' };
  }
};
