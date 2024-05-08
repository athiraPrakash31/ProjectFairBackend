// Schema maps to a mongodb collection


// import mongoose
const mongoose = require('mongoose')

// schema creation
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    github:{
        type:String
    },
    livelink:{
        type:String
    },
    profile:{
        type:String
    }
})

// 3 create model
const users = mongoose.model('users',userSchema)
module.exports = users