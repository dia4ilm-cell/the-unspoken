
import { GoogleGenAI } from "@google/genai";

export const getVisionAssistance = async (roughNotes: string) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are Sharipov, a luxury wedding videographer. A couple gave you these rough notes about their wedding vision: "${roughNotes}". 
      Help them expand this into a sophisticated, poetic creative brief (about 2-3 sentences) that reflects a high-end, cinematic, and emotional style. 
      Use words like 'timeless', 'legacy', 'cinematic', 'intimate'.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
