const HealthProgram = require("../models/HealthProgram")
const Category = require("../models/Category")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const User = require("../models/User")
const HealthProgramProgress = require("../models/HealthProgramProgress")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const { convertSecondsToDuration } = require("../utils/secToDuration")

//              CREATE HEALTH PROGRAM
exports.createHealthProgram = async (req, res) => {
  try {
    const userId = req.user.id

    const {
      healthProgramName,
      healthProgramDescription,
      whatYouWillLearn,
      price,
      tag: _tag,
      category,
      status: _status,
      instructions: _instructions,
    } = req.body

    if (!req.files?.thumbnailImage) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail image is required",
      })
    }

    let tag = []
    let instructions = []

    try {
      tag = JSON.parse(_tag)
      if (_instructions) instructions = JSON.parse(_instructions)
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format for tag or instructions",
      })
    }

    if (
      !healthProgramName ||
      !healthProgramDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      })
    }

    const status = _status || "Draft"

    const doctor = await User.findById(userId)
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      })
    }

    const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      })
    }

    const thumbnailUpload = await uploadImageToCloudinary(
      req.files.thumbnailImage,
      process.env.FOLDER_NAME
    )

    const healthProgram = await HealthProgram.create({
      healthProgramName,
      healthProgramDescription,
      doctor: doctor._id,
      whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: thumbnailUpload.secure_url,
      status,
      instructions,
    })

    await User.findByIdAndUpdate(doctor._id, {
      $push: { healthProgram: healthProgram._id },
    })

    await Category.findByIdAndUpdate(category, {
      $push: { healthPrograms: healthProgram._id },
    })

    return res.status(200).json({
      success: true,
      message: "Health Program created successfully",
      data: healthProgram,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//              EDIT HEALTH PROGRAM
exports.editHealthProgram = async (req, res) => {
  try {
    const { healthProgramId } = req.body
    const updates = req.body

    const healthProgram = await HealthProgram.findById(healthProgramId)
    if (!healthProgram) {
      return res.status(404).json({
        success: false,
        message: "Health program not found",
      })
    }

    if (req.files?.thumbnailImage) {
      const uploaded = await uploadImageToCloudinary(
        req.files.thumbnailImage,
        process.env.FOLDER_NAME
      )
      healthProgram.thumbnail = uploaded.secure_url
    }

    const skipFields = ["_id", "doctor", "createdAt", "healthProgramId"]

    for (const key in updates) {
      if (skipFields.includes(key)) continue
      if (key === "tag" || key === "instructions") {
        healthProgram[key] = JSON.parse(updates[key])
      } else {
        healthProgram[key] = updates[key]
      }
    }

    await healthProgram.save()

    return res.status(200).json({
      success: true,
      message: "Health program updated successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//              GET ALL HEALTH PROGRAMS
exports.getAllHealthPrograms = async (req, res) => {
  try {
    const programs = await HealthProgram.find({ status: "Published" })
      .populate("doctor")
      .populate("category")

    return res.status(200).json({
      success: true,
      data: programs,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//          GET HEALTH PROGRAM DETAILS (WITH VIDEO)
exports.getHealthProgramDetails = async (req, res) => {
  try {
    const { healthProgramId } = req.body

    const healthProgram = await HealthProgram.findById(healthProgramId)
      .populate({
        path: "doctor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate({
        path: "healthProgramContent",
        populate: {
          path: "SubSection",
          select: "title timeDuration description videoUrl",
        },
      })

    if (!healthProgram) {
      return res.status(404).json({
        success: false,
        message: "Health program not found",
      })
    }

    let totalSeconds = 0
    healthProgram.healthProgramContent.forEach((section) => {
      section.SubSection.forEach((sub) => {
        totalSeconds += Number(sub.timeDuration) || 0
      })
    })

    return res.status(200).json({
      success: true,
      data: {
        healthProgram,
        totalDuration: convertSecondsToDuration(totalSeconds),
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//        GET FULL HEALTH PROGRAM (PATIENT)
exports.getFullHealthProgramDetails = async (req, res) => {
  try {
    const { healthProgramId } = req.body
    const userId = req.user.id

    const healthProgram = await HealthProgram.findById(healthProgramId)
      .populate("doctor")
      .populate("category")
      .populate({
        path: "healthProgramContent",
        populate: { path: "SubSection" },
      })

    const progress = await HealthProgramProgress.findOne({
      healthProgramID: healthProgramId,
      userId,
    })

    return res.status(200).json({
      success: true,
      data: {
        healthProgram,
        completedVideos: progress?.completedVideos || [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//           DOCTOR HEALTH PROGRAMS
exports.getDoctorHealthPrograms = async (req, res) => {
  try {
    const programs = await HealthProgram.find({
      doctor: req.user.id,
    }).sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      data: programs,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

//              DELETE HEALTH PROGRAM
exports.deleteHealthProgram = async (req, res) => {
  try {
    const { healthProgramId } = req.body

    const program = await HealthProgram.findById(healthProgramId)
    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Health program not found",
      })
    }

    for (const sectionId of program.healthProgramContent) {
      const section = await Section.findById(sectionId)
      for (const subId of section.SubSection) {
        await SubSection.findByIdAndDelete(subId)
      }
      await Section.findByIdAndDelete(sectionId)
    }

    await HealthProgram.findByIdAndDelete(healthProgramId)

    return res.status(200).json({
      success: true,
      message: "Health program deleted successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
