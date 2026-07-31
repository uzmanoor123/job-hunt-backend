// const { GoogleGenAI } = require("@google/genai");
// require("dotenv").config();

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// async function callGeminiLLM(systemPrompt, userPrompt) {
//   try {
//     console.log("Calling Gemini...");

//     const response = await ai.models.generateContent({
//       model: "gemini-3.5-flash",
//       contents: `${systemPrompt}\n\n${userPrompt}`,
//     });

//     console.log("Full Response:");
//     console.log(response);

//     console.log("Response Text:");
//     console.log(response.text);

//     const profile = JSON.parse(response.text);

//     return profile;
//   } catch (err) {
//     console.error("Gemini Error:");
//     console.error(err);
//     throw err;
//   }
// }

// module.exports = {
//   callGeminiLLM,
// };

// Groq services

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const callGroqLLM = async (systemPrompt, userPrompt) => {
  try {
    console.log("Calling Groq...");

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    const text = response.choices[0].message.content;

    console.log("Groq Response:", text);

    return JSON.parse(text);
  } catch (error) {
    console.log("Groq Error:", error);
    throw error;
  }
};

module.exports = {
  callGroqLLM,
};

