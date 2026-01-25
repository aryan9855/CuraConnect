const mongoose = require("mongoose")

const healthProgramSchema = new mongoose.Schema({

    healthProgramName: {
        type: String,
        required: true,
    },

    healthProgramDescription: {
        type: String,
        required: true,
    },

    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    whatYouWillLearn: {
        type: String,
        required: true,
    },

    healthProgramContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        },
    ],

    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        },
    ],

    price: {
        type: Number,
        required: true,
    },

    thumbnail: {
        type: String,
        required: true,
    },

    tag: {
        type: [String],
        required: true,
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },

    patientEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    instructions: {
        type: [String],
        required: true,
    },

    status: {
        type: String,
        enum: ["Draft", "Published"],
        default: "Draft",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("HealthProgram", healthProgramSchema)
