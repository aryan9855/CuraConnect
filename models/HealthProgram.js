const mongoose = require("mongoose")

const healthProgramSchema = new mongoose.Schema({
    
    healthProgramName:{
        type:String,
    },

    healthProgramDescription:{
        type:String,
    },

    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    whatYouWillLearn:{
        type:String
    },
    healthProgramContent:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    price:{
        type :Number,
        required:true
    },
    thumbnail:{
        type:String
    },
    tag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    },
    patientEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Tag"
    }]

});
module.exports = mongoose.model("HealthProgram",healthProgramSchema)