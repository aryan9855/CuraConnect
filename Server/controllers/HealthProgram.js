const HealthProgram = require("../models/HealthProgram");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
const HealthProgramProgress = require("../models/HealthProgramProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");


// ================= CREATE HEALTH PROGRAM =================
exports.createHealthProgram = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Login required",
      });
    }

    const userId = req.user.id;

    const {
      healthProgramName,
      healthProgramDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status = "Draft",
      instructions,
    } = req.body;

    if (
      !healthProgramName?.trim() ||
      !healthProgramDescription?.trim() ||
      !whatYouWillLearn?.trim() ||
      !price ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    if (!req.files?.thumbnailImage) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail image is required",
      });
    }

    let parsedTag = tag ? JSON.parse(tag) : [];
    let parsedInstructions = instructions ? JSON.parse(instructions) : [];

    const doctor = await User.findById(userId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const thumbnailUpload = await uploadImageToCloudinary(
      req.files.thumbnailImage,
      process.env.FOLDER_NAME
    );

    const healthProgram = await HealthProgram.create({
      healthProgramName,
      healthProgramDescription,
      doctor: doctor._id,
      whatYouWillLearn,
      price: Number(price),
      tag: parsedTag,
      category: categoryDetails._id,
      thumbnail: thumbnailUpload.secure_url,
      status,
      instructions: parsedInstructions,
    });

    // Doctor owns this program
    await User.findByIdAndUpdate(userId, {
      $push: { healthProgram: healthProgram._id },
    });

    await Category.findByIdAndUpdate(category, {
      $push: { healthPrograms: healthProgram._id },
    });

    return res.status(201).json({
      success: true,
      message: "Health Program created successfully",
      data: healthProgram,
    });

  } catch (error) {
    console.error("CREATE HEALTH PROGRAM ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// ================= GET ALL HEALTH PROGRAMS =================
exports.getAllHealthPrograms = async (req, res) => {
  try {
    const programs = await HealthProgram.find({ status: "Published" })
      .populate("doctor")
      .populate("category");

    return res.status(200).json({
      success: true,
      data: programs,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= GET HEALTH PROGRAM DETAILS =================
exports.getHealthProgramDetails = async (req, res) => {
  try {
    const { healthProgramId } = req.body;

    const healthProgram = await HealthProgram.findById(healthProgramId)
      .populate({
        path: "doctor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate({
        path: "healthProgramContent",
        populate: {
          path: "subSection",
          select: "title timeDuration description videoUrl",
        },
      });

    if (!healthProgram) {
      return res.status(404).json({
        success: false,
        message: "Health program not found",
      });
    }

    let totalSeconds = 0;
    healthProgram.healthProgramContent.forEach((section) => {
      section.subSection.forEach((sub) => {
        totalSeconds += Number(sub.timeDuration) || 0;
      });
    });

    return res.status(200).json({
      success: true,
      data: {
        healthProgram,
        totalDuration: convertSecondsToDuration(totalSeconds),
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= GET FULL HEALTH PROGRAM =================
exports.getFullHealthProgramDetails = async (req, res) => {
  try {
    const { healthProgramId } = req.body;
    const userId = req.user.id;

    const healthProgram = await HealthProgram.findById(healthProgramId)
      .populate("doctor")
      .populate("category")
      .populate({
        path: "healthProgramContent",
        populate: { path: "subSection" },
      });

    const progress = await HealthProgramProgress.findOne({
      healthProgramID: healthProgramId,
      userId,
    });

    return res.status(200).json({
      success: true,
      data: {
        healthProgram,
        completedVideos: progress?.completedVideos || [],
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= DOCTOR HEALTH PROGRAMS =================
exports.getDoctorHealthPrograms = async (req, res) => {
  try {
    const programs = await HealthProgram.find({
      doctor: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: programs,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= DELETE HEALTH PROGRAM =================
exports.deleteHealthProgram = async (req, res) => {
  try {
    const { healthProgramId } = req.body;

    const program = await HealthProgram.findById(healthProgramId);
    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Health program not found",
      });
    }

    for (const sectionId of program.healthProgramContent) {
      const section = await Section.findById(sectionId);
      for (const subId of section.subSection) {
        await SubSection.findByIdAndDelete(subId);
      }
      await Section.findByIdAndDelete(sectionId);
    }

    await HealthProgram.findByIdAndDelete(healthProgramId);

    return res.status(200).json({
      success: true,
      message: "Health program deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= EDIT HEALTH PROGRAM =================
exports.editHealthProgram = async (req, res) => {
  try {
    const { healthProgramId } = req.body;
    const updates = req.body;

    const healthProgram = await HealthProgram.findById(healthProgramId);

    if (!healthProgram) {
      return res.status(404).json({
        success: false,
        message: "Health program not found",
      });
    }

    const skipFields = ["_id", "doctor", "createdAt", "healthProgramId"];

    for (const key in updates) {
      if (skipFields.includes(key)) continue;
      if (key === "tag" || key === "instructions") {
        healthProgram[key] = JSON.parse(updates[key]);
      } else {
        healthProgram[key] = updates[key];
      }
    }

    await healthProgram.save();

    return res.status(200).json({
      success: true,
      message: "Health program updated successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= UNENROLL HEALTH PROGRAM =================
exports.unenrollFromHealthProgram = async (req, res) => {
  try {
    const { healthProgramId } = req.body;
    const userId = req.user.id;

    if (!healthProgramId) {
      return res.status(400).json({
        success: false,
        message: "Health Program ID is required",
      });
    }

    // Remove user from HealthProgram
    await HealthProgram.findByIdAndUpdate(
      healthProgramId,
      { $pull: { patientsEnrolled: userId } }
    );

    // 🔥 MATCHES YOUR USER MODEL FIELD (singular)
    await User.findByIdAndUpdate(
      userId,
      { $pull: { healthProgram: healthProgramId } }
    );

    return res.status(200).json({
      success: true,
      message: "Successfully unenrolled",
    });

  } catch (error) {
    console.error("Unenroll error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while unenrolling",
    });
  }
};
