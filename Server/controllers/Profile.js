const Profile = require("../models/Profile")
const HealthProgramProgress = require("../models/HealthProgramProgress")
const HealthProgram = require("../models/HealthProgram")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const mongoose = require("mongoose")
const { convertSecondsToDuration } = require("../utils/secToDuration")

// Update patient profile
  exports.updateProfile = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        dateOfBirth,
        about,
        contactNumber,
        gender,
      } = req.body
  
      const userId = req.user.id
  
      // Fetch user
      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        })
      }
  
      // Update User fields ONLY if provided
      if (firstName !== undefined) user.firstName = firstName
      if (lastName !== undefined) user.lastName = lastName
  
      await user.save()
  
      // Fetch Profile
      const profile = await Profile.findById(user.additionalDetails)
      if (!profile) {
        return res.status(404).json({
          success: false,
          message: "Profile not found",
        })
      }
  
      // Update Profile fields ONLY if provided
      if (dateOfBirth !== undefined) profile.dateOfBirth = dateOfBirth
      if (about !== undefined) profile.about = about
      if (contactNumber !== undefined) profile.contactNumber = contactNumber
      if (gender !== undefined) profile.gender = gender
  
      await profile.save()
  
      const updatedUserDetails = await User.findById(userId)
      .populate({
        path: "additionalDetails",
        model: "Profile",
      })
      
        .exec()
  
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        updatedUserDetails,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  

// Delete patient account
exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Delete associated profile
    if (user.additionalDetails) {
      await Profile.findByIdAndDelete(
        new mongoose.Types.ObjectId(user.additionalDetails)
      )
    }

    // Remove patient from health programs
    if (user.healthProgram && Array.isArray(user.healthProgram)) {
      for (const healthProgramId of user.healthProgram) {
        await HealthProgram.findByIdAndUpdate(
          healthProgramId,
          { $pull: { patientEnrolled: id } },
          { new: true }
        )
      }
    }

    // Delete progress
    await HealthProgramProgress.deleteMany({ userId: id })

    // Delete user
    await User.findByIdAndDelete(id)

    res.status(200).json({
      success: true,
      message: "Patient account deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Patient cannot be deleted successfully",
    })
  }
}

// Get patient details
exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec()

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Patient data fetched successfully",
      data: userDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Update profile picture
exports.updateDisplayPicture = async (req, res) => {
  try {
    if (!req.files || !req.files.displayPicture) {
      return res.status(400).json({
        success: false,
        message: "Display picture is required",
      })
    }
    const displayPicture = req.files.displayPicture
    const userId = req.user.id

    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )

    if (!image || !image.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image",
      })
    }

    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      { image: image.secure_url },
      { new: true }
    )

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Image updated successfully",
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get enrolled health programs
exports.getEnrolledHealthPrograms = async (req, res) => {
  try {
    const userId = req.user.id

    let userDetails = await User.findById(userId)
      .populate({
        path: "healthProgram",
        populate: {
          path: "healthProgramContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    userDetails = userDetails.toObject()

    if (!userDetails.healthProgram || !Array.isArray(userDetails.healthProgram)) {
      return res.status(200).json({
        success: true,
        data: [],
      })
    }

    for (let i = 0; i < userDetails.healthProgram.length; i++) {
      let totalDurationInSeconds = 0
      let subSectionLength = 0

      const programContent = userDetails.healthProgram[i].healthProgramContent || []
      
      for (let j = 0; j < programContent.length; j++) {
        const subSection = programContent[j].subSection || []
        
        totalDurationInSeconds += subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration || 0),
          0
        )

        subSectionLength += subSection.length
      }

      userDetails.healthProgram[i].totalDuration =
        convertSecondsToDuration(totalDurationInSeconds)

      let progress = await HealthProgramProgress.findOne({
        healthProgramID: userDetails.healthProgram[i]._id,
        userId,
      })

      const completed = progress?.completedVideos?.length || 0

      userDetails.healthProgram[i].progressPercentage =
        subSectionLength === 0
          ? 100
          : Math.round((completed / subSectionLength) * 100 * 100) / 100
    }

    return res.status(200).json({
      success: true,
      data: userDetails.healthProgram,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Doctor dashboard
exports.doctorDashboard = async (req, res) => {
  try {
    const healthPrograms = await HealthProgram.find({ doctor: req.user.id })

    const dashboardData = healthPrograms.map((program) => {
      const totalPatientsEnrolled = program.patientEnrolled?.length || 0
      const programPrice = program.price || 0
      const totalAmountGenerated = totalPatientsEnrolled * programPrice

      return {
        _id: program._id,
        programName: program.healthProgramName,
        programDescription: program.healthProgramDescription,
        totalPatientsEnrolled,
        totalAmountGenerated,
      }
    })

    res.status(200).json({ healthPrograms: dashboardData })
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message || "Server Error" 
    })
  }
}
