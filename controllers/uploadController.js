const fs = require("fs");
const pdfParse = require("pdf-parse");
const Profile = require("../models/Profile");

const { callGeminiLLM } = require("../services/geminiService");
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Failed to upload resume",
      });
    }
    const fileBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(fileBuffer);
    const systemPrompt = `
    You are an expert resume parser.
    Extract resume information and return only valid JSON format.
    Return this structure:

    {
      "name":"",
      "email":"",
      "phone":"",
      "skills":[],
      "summary":[],
      "education":[],
      "projects":[],
      "experience":[],
      "certificate":[],
      "languages":[],
    }
    If any field is missing return empty string or empty array.
    Do not write markdown.
    Do not explain anything.
    `;
    const userPrompt = data.text;
    const profile = await callGeminiLLM(systemPrompt, userPrompt);
    const profileData = {
      ...profile,
      user: req.user.id
    }
    const savedProfile = await Profile.findOneAndUpdate(
      {
        user: req.user.id
      },
      profileData,
      {
        new: true,
        upsert: true,
      },
    );
    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      savedProfile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id 
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadResume,
  getProfile,
};
