const {OpenAI} = require("openai");
const dotenv = require("dotenv")
dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});
async function testAI() {
const response =   await openai.chat.completions.create({
    model: "gemini-3.5-flash",
    messages: [
        {   role: "system",
            content: "You are a helpful assistant." 
        },
        {
            role: "user",
            content: "Explain to me how AI works",
        },
    ],
});

console.log(response.choices[0].message.content);
}
testAI();