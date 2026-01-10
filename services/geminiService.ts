
import { GoogleGenAI } from "@google/genai";

export const getVisionAssistance = async (roughNotes: string) => {
  // Safe check for API key to prevent crashes in browser environments
  const getApiKey = () => {
    try {
      return process.env.API_KEY;
    } catch (e) {
      return undefined;
    }
  };

  const apiKey = getApiKey();
  if (!apiKey) return null;
  
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are Sharipov, a luxury wedding videographer. A couple gave you these rough notes about their wedding vision: "${roughNotes}". 
      Help them expand this into a sophisticated, poetic creative brief (about 2-3 sentences) that reflects a high-end, cinematic, and emotional "Sharipov Video Production" style. 
      Use words like 'timeless', 'legacy', 'cinematic', 'intimate', 'heritage'. Don't use bullet points.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
