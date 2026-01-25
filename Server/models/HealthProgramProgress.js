const mongoose = require("mongoose");

const healthProgramProgressSchema = new mongoose.Schema(
  {
    healthProgramID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthProgram",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    completedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "HealthProgramProgress",
  healthProgramProgressSchema
);
