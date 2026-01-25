const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    healthPrograms:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"HealthProgram"
    }]
})

module.exports = mongoose.model("Category",categorySchema)