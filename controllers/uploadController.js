const uploadResume = (req,res)=>{
    if(!req.file){
        return res.status(400).json({
            success: false,
            message: "Failed to upload resume"
        })
    }
    res.status(200).json({
        success: true,
        message: "Resume uploaded successfully",
        file: req.file
    })

}
module.exports = {
    uploadResume
}