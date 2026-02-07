const Section = require("../models/Section")
const HealthProgram = require("../models/HealthProgram")
const SubSection = require("../models/SubSection")

// ================================
// CREATE Section
// ================================
exports.addSection = async (req, res) => {
  try {
    const { sectionName, healthProgramId } = req.body

    if (!sectionName || !healthProgramId) {
      return res.status(400).json({
        success: false,
        message: "Missing required properties",
      })
    }

    const newSection = await Section.create({ sectionName })

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
          path: "SubSection", // Must match model
        },
      })
      .exec()

    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      data: updatedHealthProgram, // ✅ consistent key
    })

  } catch (error) {
    console.error("Error creating section:", error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


// ================================
// UPDATE Section
// ================================
exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, healthProgramId } = req.body

    if (!sectionId || !healthProgramId) {
      return res.status(400).json({
        success: false,
        message: "Section ID and HealthProgram ID required",
      })
    }

    await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    )

    const healthProgram = await HealthProgram.findById(healthProgramId)
      .populate({
        path: "healthProgramContent",
        populate: {
          path: "SubSection",
        },
      })
      .exec()

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: healthProgram,
    })

  } catch (error) {
    console.error("Error updating section:", error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


// ================================
// DELETE Section
// ================================
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, healthProgramId } = req.body

    if (!sectionId || !healthProgramId) {
      return res.status(400).json({
        success: false,
        message: "Section ID and HealthProgram ID required",
      })
    }

    // Remove section from HealthProgram
    await HealthProgram.findByIdAndUpdate(healthProgramId, {
      $pull: {
        healthProgramContent: sectionId,
      },
    })

    const section = await Section.findById(sectionId)

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      })
    }

    // Delete all SubSections
    if (Array.isArray(section.SubSection) && section.SubSection.length > 0) {
      await SubSection.deleteMany({
        _id: { $in: section.SubSection },
      })
    }

    await Section.findByIdAndDelete(sectionId)

    const healthProgram = await HealthProgram.findById(healthProgramId)
      .populate({
        path: "healthProgramContent",
        populate: {
          path: "SubSection",
        },
      })
      .exec()

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: healthProgram,
    })

  } catch (error) {
    console.error("Error deleting section:", error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
