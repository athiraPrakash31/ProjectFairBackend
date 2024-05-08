const multer = require ('multer')
// To store multer data , All words are predefined

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    // set image name
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

const filefilter = (req,file,callback)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error("Please upload following image extension(png,jpeg,jpg) only..."))
    }
}

const multerConfig = multer({
    storage,filefilter
})

module.exports = multerConfig