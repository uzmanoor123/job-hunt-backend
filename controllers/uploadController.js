const fs = require("fs");
const pdfParse = require("pdf-parse");
const Profile = require("../models/Profile");
const {getJobsFromJSearch} = require('../services/jobService')

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
Extract information from the resume and return ONLY valid JSON.
Return this exact structure:
{
  "name": "",
  "email": "",
  "phone": "",
  "summary": "",
  "skills": [
    ""
  ],
  "jobTitle":"",
  "education": [
    {
      "degree": "",
      "institute": "",
      "year": ""
    }
  ],
  "experience": [
    {
      "role": "",
      "company": "",
      "duration": "",
      "description": ""
    }
  ]
}

Rules:
 Return only valid JSON.
 Do not use markdown.
 Do not explain anything.
 If a field is missing, return an empty string or an empty array.
  Summary should be concise (maximum 3-4 lines).
 Only include professional work experience (internships, jobs, freelancing, volunteer work).
 Do NOT include academic, personal, or university projects in the experience section.
 If there is no professional experience, return "experience": [].
 Education must be an array of objects.
 Skills must be an array of strings.

 <IMPORTANT>
 must provide jobTitle according to resume
 </IMPORTANT>
`;
    const userPrompt = data.text;
    console.log("PDF Parsed");
    const profile = await callGeminiLLM(systemPrompt, userPrompt);
    console.log("Gemini Response:", profile);

    const profileData = {
      ...profile,
      user: req.user.id,
    };
    console.log("Saving Profile For User:", req.user.id);
    const savedProfile = await Profile.findOneAndUpdate(
      {
        user: req.user.id,
      },
      profileData,
      {
        new: true,
        upsert: true,
      },
    );
    const jobs = await getJobsFromJSearch(savedProfile);
    savedProfile.jobs = jobs
    await savedProfile.save();
    
    console.log(savedProfile);
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
    console.log("Logged in user id:", req.user.id);

    const profile = await Profile.findOne({
      user: req.user.id,
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
