const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function callGeminiLLM(systemPrompt, userPrompt) {
  try {
    console.log("Calling Gemini...");

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `${systemPrompt}\n\n${userPrompt}`,
    });

    console.log("Full Response:");
    console.log(response);

    console.log("Response Text:");
    console.log(response.text);

    const profile = JSON.parse(response.text);

    return profile;
  } catch (err) {
    console.error("Gemini Error:");
    console.error(err);
    throw err;
  }
}

module.exports = {
  callGeminiLLM,
};