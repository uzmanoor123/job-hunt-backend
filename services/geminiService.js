const { OpenAI } = require("openai");
const dotenv = require("dotenv")
dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});
async function callGeminiLLM(systemPrompt, userPrompt) {
    const response = await openai.chat.completions.create({
        model: "gemini-3.5-flash",
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: userPrompt,
            },
        ],
        response_format: {
            type: "json_object",
        },
    });

    const profile = JSON.parse(response.choices[0].message.content);
    console.log(profile)
    return profile
}

module.exports = { callGeminiLLM };