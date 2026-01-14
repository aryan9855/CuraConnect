const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true       
    },
    email:{
        type:String,
        required:true,
        trim:true          
    },
    password:{
        type:String,
        required:true      
    },
    accountType:{
        type:String,
        enum:["Admin" ,"Patient","Doctor"],
        required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    healthProgram:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"HealthProgram"
        }
    ],
    image:{
        type:String,
        required:true
    },
    healthProgramProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"HealthProgramProgress"
        }
    ]

});
module.exports = mongoose.model("User",userSchema)