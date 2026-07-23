const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    skills: [
      {
        type: String,
      },
    ],
    summary: {
      type: String,
    },
    education: [
      {
        degree: String,
        institute: String,
        year: String,
      },
    ],
    experience: [
      {
        company: String,
        role: String,
        duration: String,
        description: String,
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        technologies: [String],
      },
    ],
    certificate: [
      {
        name: String,
        issuer: String,
        year: String,
      },
    ],
    languages: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);
const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
