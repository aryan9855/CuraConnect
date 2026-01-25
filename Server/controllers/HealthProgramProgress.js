const SubSection = require("../models/SubSection");
const HealthProgramProgress = require("../models/HealthProgramProgress");

exports.updateHealthProgramProgress = async (req, res) => {
  try {
    const { healthProgramId, subsectionId } = req.body;
    const userId = req.user.id;

    // Validation
    if (!healthProgramId || !subsectionId) {
      return res.status(400).json({
        success: false,
        message: "healthProgramId and subsectionId are required",
      });
    }

    // Check if subsection exists
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return res.status(404).json({
        success: false,
        message: "Invalid subsection",
      });
    }

    // Find or create progress document
    let healthProgramProgress = await HealthProgramProgress.findOne({
      healthProgramID: healthProgramId,
      userId: userId,
    });

    if (!healthProgramProgress) {
      // Create new progress document if it doesn't exist
      healthProgramProgress = await HealthProgramProgress.create({
        healthProgramID: healthProgramId,
        userId: userId,
        completedVideos: [],
      });
    }

    // Initialize completedVideos if it doesn't exist
    if (!healthProgramProgress.completedVideos) {
      healthProgramProgress.completedVideos = [];
    }

    // Check if already completed
    if (healthProgramProgress.completedVideos.includes(subsectionId)) {
      return res.status(400).json({
        success: false,
        message: "Subsection already completed",
      });
    }

    // Mark subsection as completed
    healthProgramProgress.completedVideos.push(subsectionId);
    await healthProgramProgress.save();

    return res.status(200).json({
      success: true,
      message: "Health program progress updated successfully",
      data: healthProgramProgress,
    });
  } catch (error) {
    console.error("Update Health Program Progress Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
