const HealthProgramProgress = require("../models/HealthProgramProgress");
const SubSection = require("../models/SubSection");
const HealthProgram = require("../models/HealthProgram");

// =============================================
// MARK LECTURE AS COMPLETE
// =============================================
exports.updateHealthProgramProgress = async (req, res) => {



  try {
    const { healthProgramId, subsectionId } = req.body;
    const userId = req.user.id;

    if (!healthProgramId || !subsectionId) {
      return res.status(400).json({
        success: false,
        message: "HealthProgram ID and SubSection ID are required",
      });
    }

    // 1️⃣ Check subsection exists
    const subSection = await SubSection.findById(subsectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Invalid SubSection",
      });
    }

    // 2️⃣ Find progress document
    let progress = await HealthProgramProgress.findOne({
      healthProgramID: healthProgramId,
      userId,
    });

    // 3️⃣ If not exists → create it automatically
    if (!progress) {
      progress = await HealthProgramProgress.create({
        healthProgramID: healthProgramId,
        userId,
        completedVideos: [subsectionId],
      });

      return res.status(200).json({
        success: true,
        message: "Lecture marked as completed",
      });
    }

    // 4️⃣ Prevent duplicate completion
    if (progress.completedVideos.includes(subsectionId)) {
      return res.status(400).json({
        success: false,
        message: "Lecture already completed",
      });
    }

    // 5️⃣ Push new completed lecture
    progress.completedVideos.push(subsectionId);
    await progress.save();

    return res.status(200).json({
      success: true,
      message: "Lecture marked as completed",
    });

  } catch (error) {
    console.error("MARK COMPLETE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
