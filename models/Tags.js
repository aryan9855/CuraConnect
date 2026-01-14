const mongoose = required("mongoose")

const tagsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    healthProgram:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"HealthProgram"
    }
})

module.exports = mongoose.model("Tag",tagsSchema)