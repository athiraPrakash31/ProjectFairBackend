// import jwt token
const jwt = require('jsonwebtoken')

// Token Verification
const jwtMiddleware = (req,res,next)=>{
console.log("Inside jwt middleware");
try{
    // get the token
    const token = req.headers['authorization'].slice(7)
    console.log(token);
    // token verification
    const jwtVerification = jwt.verify(token,"superKEY")
    console.log(jwtVerification);
    req.payload = jwtVerification.userId
    console.log(req.payload);
    next()
    }
    catch(err){
        res.status(401).json({"AuthorizationError":err.message})
    }
}




module.exports = jwtMiddleware
