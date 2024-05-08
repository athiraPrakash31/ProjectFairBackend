const applicationMiddleware = (req,res,next)=>{
    console.log("Inside Applicaton Middleware");
    next()

}

module.exports = applicationMiddleware