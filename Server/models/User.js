const mongoose = require("mongoose");

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
    },active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
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
    token:{
        type:String,
    },
    resetPasswordExpire:{
        type:Date
    },
    healthProgramProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"HealthProgramProgress"
        }
    ]
},
// Add timestamps for when the document is created and last modified
{ timestamps: true });
module.exports = mongoose.model("User",userSchema)