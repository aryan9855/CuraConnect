const mongoose = require("mongoose")

const healthProgramProgressSchema = new mongoose.Schema({
    
    healthProgramID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"HealthProgram"
    },
    completedVideos:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection"
    }

});
module.exports = mongoose.model("HealthProgramProgress",healthProgramProgressSchema)