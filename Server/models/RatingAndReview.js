const mongoose = require("mongoose");
const HealthProgram = require("./HealthProgram");

const ratingAndReviewSchema = new mongoose.Schema({
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:Number,
        required:true
    },
	HealthProgram: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "HealthProgram",
		index: true,
	}

});
module.exports = mongoose.model("RatingAndReview",ratingAndReviewSchema)