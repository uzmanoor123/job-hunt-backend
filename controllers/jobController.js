const Profile = require("../models/Profile");
const { getJobsFromJSearch } = require("../services/jobService");
const matchJobs = async (req, res) => {
      console.log("Logged in user id:", req.user.id);
    try {
        const profile = await Profile.findOne({
            user: req.user.id
            
        });
         console.log("Profile found:", profile);
        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            })
        }

        console.log("Skills:", profile.skills);
        if (!profile.skills || profile.skills.length === 0) {
            return res.status(404).json({
                message: "No skills found"
            })
        }
        const jobs = await getJobsFromJSearch(
            profile
        );
          console.log("Matched jobs:", jobs);
        profile.jobs = jobs;
        await profile.save();
        res.json({
            success: true,
            jobs: jobs
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to match jobs"
        });
    }
}
module.exports = {
    matchJobs
}