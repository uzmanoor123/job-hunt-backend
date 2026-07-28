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
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required:true 
    },
    jobTitle: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
      summary: {
      type: String
    },
    skills: [
      {
        type: String,
      },
    ],

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
    jobs:[
      mongoose.Schema.Types.Mixed
    ]

  },
  {
    timestamps: true,
  },
);
const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
