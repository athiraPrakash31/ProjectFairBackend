// 1. import userSchema or model
const users =require('../Models/userSchema')
const jwt = require('jsonwebtoken')
// 2.Register Logic
exports.register = async(req,res)=>{
    const {username,email,password} =req.body
    console.log(username,email,password);
    // accept data from client
    try {
  // check if the email is already registered
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            res.status(406).json("User already exist")
        }
  // register new user to mongodb
        else{
            const newUser = new users({
                username,
                email,
                password,
                github:"",
                livelink:"",
                profile:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(500).json("Register failed...")
    }
}


exports.login = async(req,res)=>{
    console.log("Inside login method");
    // accept data from client
const {email, password} = req.body
 try{
    const existingUser = await users.findOne({email,password})
    if(existingUser){
        const token = jwt.sign({userId:existingUser._id},"superKEY")
        console.log(token);
        res.status(200).json({existingUser,token})
    }
    else{
        res.status(404).json('Invalid email or password')
    }
 }
 catch(err){
    res.status(500).json('Register failed'+err)
 }
}