const RatingAndReview = require("../models/RatingAndReview")
const HealthProgram = require("../models/HealthProgram")
const mongoose = require("mongoose")

//create Rating 
exports.createRating = async(req , res)=>{
    try {
         // get user id
         const userId = req.user.id
        
         //get data
         const {rating, review, healthProgramId} = req.body

         if (!rating || !review || !healthProgramId) {
             return res.status(400).json({
                 success: false,
                 message: 'Rating, review, and healthProgramId are required'
             })
         }

         //check if user is enrolled or not 
         const healthProgramDetails = await HealthProgram.findOne({
                                        _id: healthProgramId,
                                        patientEnrolled: {$elemMatch: {$eq: userId}}
                                    })
        if(!healthProgramDetails){
            return res.status(404).json({
                success:false,
                message:'Patient is not enrolled in this health program'
            })
        }

         // check is user is already reviewed 
        const alreadyReviewed = await RatingAndReview.findOne({
                                                            user:userId,
                                                            healthProgram: healthProgramId
                                                            })

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:'Health Program is already reviewed by User'
            })
        }

         // create review
         const ratingReview = await RatingAndReview.create({
                                                            rating , review,
                                                            healthProgram:healthProgramId,
                                                            user:userId
                                                            })

         // update the health program
          const updatedHealthProgramDetails = await HealthProgram.findByIdAndUpdate(
                                                {_id:healthProgramId},
                                                {
                                                    $push:{
                                                        ratingAndReviews : ratingReview._id
                                                    }
                                                },
                                                {new:true}
          )
          console.log(updatedHealthProgramDetails)
         // return response
         return res.status(200).json({
            success:true,
            message:'Rating and Review created Successfully',
            ratingReview
         })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



// get avg rating
exports.getAverageRating = async( req, res)=>{
    try {
        //get healthProgram id
        const healthProgramId = req.body.healthProgramId

        // calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    healthProgram: new mongoose.Types.ObjectId(healthProgramId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating :{
                         $avg:"$rating"
                    }
                }
            }
        ])
        // return rating
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }       
        
        //if no rating
        return res.status(200).json({
            success:true,
            message:'No rating available till now',
            averageRating :0
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



// get all rating
exports.getAllRating = async(req, res)=>{
    try {
        const allReviews = await RatingAndReview.find({})
                                .sort({rating:"desc"})
                                .populate({
                                    path:"user",
                                    select:"firstName lastName email , image"
                                })
                                .populate({
                                    path:"healthProgram",
                                    select:"healthProgramName"
                                })
                                .exec();
        return res.status(200).json({
            success:true,
            message:"All reviews are fetched successfully",
            data:allReviews
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}