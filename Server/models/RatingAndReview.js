const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    review: {
      type: String, // 🔥 MUST BE STRING
      required: true,
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    healthProgram: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthProgram",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "RatingAndReview",
  ratingAndReviewSchema
);
