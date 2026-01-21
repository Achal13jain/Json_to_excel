import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

/**
 * Helper to try multiple model names because availability varies by account/region.
 */
async function getWorkingModel(genAI) {
  const modelNames = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro", "gemini-1.0-pro"];
  
  for (const name of modelNames) {
    try {
      const model = genAI.getGenerativeModel({ model: name });
      // Lightweight check (empty prompt) might error differently, so we just return the model instance
      // and let the main call fail if it's wrong, but optimally we'd check.
      // Instead, we will just use the first one and implement fallback in the main loop.
      return name;
    } catch (e) {
      console.warn(`Model ${name} setup failed locally`, e);
    }
  }
  return "gemini-1.5-flash"; // Default
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

  // We are analyzing the JSON DATA (Text), NOT an Excel file.
  // We take a sample to avoid token limits.
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

  // List of models to try in order of preference
  const modelsToTry = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-001",
    "gemini-1.5-flash-002",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-1.5-pro-001",
    "gemini-1.5-pro-latest",
    "gemini-1.0-pro", 
    "gemini-pro"
  ];

  for (const modelName of modelsToTry) {
    try {
      // console.log(`Attempting analysis with model: ${modelName}`); // Remove log to clean console
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '');
      return JSON.parse(cleanJson);
    } catch (error) {
      // Only log if it's NOT a 404 (model not found), or if it's the last one
      const is404 = error.message.includes('404') || error.message.includes('not found');
      if (!is404) {
         console.warn(`Model ${modelName} error:`, error.message);
      }
      
      if (modelName === modelsToTry[modelsToTry.length - 1]) {
        return { error: `All models failed. Please check API Key permissions. Last error: ${error.message}`, status: 'failed' };
      }
    }
  }
};
