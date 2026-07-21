const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,res,cd){
        cb(null, '/uploads')
    },
    filename:function(req,files,cb){
        
    }
})