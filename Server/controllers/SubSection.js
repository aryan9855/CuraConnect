const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const HealthProgram = require("../models/HealthProgram");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// ========================================
// CREATE SubSection
// ========================================
exports.addSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;

    if (!sectionId || !title || !description || !req.files?.video) {
      return res.status(400).json({
        success: false,
        message: "All fields including video are required",
      });
    }

    const uploadResponse = await uploadImageToCloudinary(
      req.files.video,
      process.env.FOLDER_NAME
    );

    const newSubSection = await SubSection.create({
      title,
      description,
      videoUrl: uploadResponse.secure_url,
      timeDuration: uploadResponse.duration
        ? uploadResponse.duration.toString()
        : "0",
    });

    // ✅ FIXED lowercase
    await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSection: newSubSection._id },
      },
      { new: true }
    );

    const healthProgram = await HealthProgram.findOne({
      healthProgramContent: sectionId,
    })
      .populate({
        path: "healthProgramContent",
        populate: {
          path: "subSection",   // ✅ FIXED
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      data: healthProgram,
    });

  } catch (error) {
    console.error("Add SubSection Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// UPDATE SubSection
// ========================================
exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, description } = req.body;

    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "SubSection ID is required",
      });
    }

    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;

    if (req.files?.video) {
      const uploadResponse = await uploadImageToCloudinary(
        req.files.video,
        process.env.FOLDER_NAME
      );

      updateData.videoUrl = uploadResponse.secure_url;
      updateData.timeDuration = uploadResponse.duration
        ? uploadResponse.duration.toString()
        : "0";
    }

    await SubSection.findByIdAndUpdate(subSectionId, updateData, {
      new: true,
    });

    // ✅ FIXED lowercase
    const section = await Section.findOne({
      subSection: subSectionId,
    });

    const healthProgram = await HealthProgram.findOne({
      healthProgramContent: section._id,
    })
      .populate({
        path: "healthProgramContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data: healthProgram,
    });

  } catch (error) {
    console.error("Update SubSection Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================================
// DELETE SubSection
// ========================================
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    if (!subSectionId || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "SubSection ID and Section ID are required",
      });
    }

    // ✅ FIXED lowercase
    await Section.findByIdAndUpdate(sectionId, {
      $pull: { subSection: subSectionId },
    });

    await SubSection.findByIdAndDelete(subSectionId);

    const healthProgram = await HealthProgram.findOne({
      healthProgramContent: sectionId,
    })
      .populate({
        path: "healthProgramContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
      data: healthProgram,
    });

  } catch (error) {
    console.error("Delete SubSection Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
