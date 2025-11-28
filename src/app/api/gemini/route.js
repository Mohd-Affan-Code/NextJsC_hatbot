import { GoogleGenAI } from "@google/genai";

// API Key automatically loads from GEMINI_API_KEY in .env.local
const ai = new GoogleGenAI({});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Call the Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // Disables thinking
        },
        systemInstruction:
          "You are a Frontend Developer. Your name is Mohd Affan.",
      },
    });

    // Extract the text response
    const botResponse = response.text;
    console.log(botResponse);

    return new Response(JSON.stringify({ response: botResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
