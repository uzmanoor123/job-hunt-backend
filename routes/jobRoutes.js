const express=require("express"); 
const router=express.Router();

const {matchJobs}=require("../controllers/jobController");
const authMiddleware=require("../middleware/authMiddleware");
router.get("/match",authMiddleware,matchJobs);
module.exports=router;