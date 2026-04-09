import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

/**
 * Attempts to initialize a working Gemini model from the available list.
 */
async function getWorkingModel(genAI) {
  const modelNames = ["gemini-2.5-flash"];
  
  for (const name of modelNames) {
    try {
      genAI.getGenerativeModel({ model: name });
      return name;
    } catch (e) {
      // Continue to next model
    }
  }
  return "gemini-2.5-flash";
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

  // Analyze a sample of the JSON data to prevent token limit issues
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

  // Prioritize newer models, falling back to stable versions
  const modelsToTry = [
    "gemini-2.5-flash",
    "gemini-2.5-pro",
    "gemini-2.5-flash-lite",
    "gemini-2.0-flash", // Fallback to previous stable
    "gemini-1.5-flash"  // Last resort legacy
  ];

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '');
      return JSON.parse(cleanJson);
    } catch (error) {
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
