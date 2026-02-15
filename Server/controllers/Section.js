const Section = require("../models/Section");
const HealthProgram = require("../models/HealthProgram");
const SubSection = require("../models/SubSection");

// ================================
// CREATE SECTION
// ================================
exports.addSection = async (req, res) => {
  try {
    const { sectionName, healthProgramId } = req.body;

    if (!sectionName || !healthProgramId) {
      return res.status(400).json({
        success: false,
        message: "Missing required properties",
      });
    }

    const newSection = await Section.create({ sectionName });

    const updatedHealthProgram = await HealthProgram.findByIdAndUpdate(
      healthProgramId,
      {
        $push: {
          healthProgramContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "healthProgramContent",
        populate: {
          path: "subSection",   // ✅ FIXED (lowercase s)
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      data: updatedHealthProgram,
    });

  } catch (error) {
    console.error("Error creating section:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// UPDATE SECTION
// ================================
exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, healthProgramId } = req.body;

    if (!sectionId || !healthProgramId) {
      return res.status(400).json({
        success: false,
        message: "Section ID and HealthProgram ID required",
      });
    }

    await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    const healthProgram = await HealthProgram.findById(healthProgramId)
      .populate({
        path: "healthProgramContent",
        populate: {
          path: "subSection",   // ✅ FIXED
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: healthProgram,
    });

  } catch (error) {
    console.error("Error updating section:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// DELETE SECTION
// ================================
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, healthProgramId } = req.body;

    if (!sectionId || !healthProgramId) {
      return res.status(400).json({
        success: false,
        message: "Section ID and HealthProgram ID required",
      });
    }

    await HealthProgram.findByIdAndUpdate(healthProgramId, {
      $pull: {
        healthProgramContent: sectionId,
      },
    });

    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // ✅ FIXED lowercase subSection
    if (Array.isArray(section.subSection) && section.subSection.length > 0) {
      await SubSection.deleteMany({
        _id: { $in: section.subSection },
      });
    }

    await Section.findByIdAndDelete(sectionId);

    const healthProgram = await HealthProgram.findById(healthProgramId)
      .populate({
        path: "healthProgramContent",
        populate: {
          path: "subSection",   // ✅ FIXED
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: healthProgram,
    });

  } catch (error) {
    console.error("Error deleting section:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
