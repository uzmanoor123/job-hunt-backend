const Profile = require("../models/Profile");
const {getJobsFromJSearch} = require("../services/jobService");
const matchJobs = async(req,res)=>{
try{
const profile = await Profile.findOne({
    user:req.user.id
});
if(!profile){
return res.status(404).json({
message:"Profile not found"
})
}
if(!profile.skills || profile.skills.length===0){
return res.status(404).json({
message:"No skills found"
})
}
const jobs = await getJobsFromJSearch(
    profile.skills
);
profile.jobs = jobs;
await profile.save();
res.json({
success:true,
jobs:jobs
});
}
catch(error){
console.log(error);
res.status(500).json({
success:false,
message:"Failed to match jobs"
});
}
}
module.exports={
matchJobs
}