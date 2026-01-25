const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const HealthProgram = require("../models/HealthProgram")

const { uploadImageToCloudinary } = require("../utils/imageUploader")

// CREATE a new subsection
exports.addSubSection = async (req, res) => {
	try {
	  const { sectionId, title, timeDuration, description } = req.body
  
	  if (!sectionId || !title || !timeDuration || !req.files?.video) {
		return res.status(400).json({
		  success: false,
		  message: "All fields including video are required",
		})
	  }
  
	  // ✅ Upload video to Cloudinary
	  const uploadResponse = await uploadImageToCloudinary(
		req.files.video,
		process.env.FOLDER_NAME
	  )
  
	  if (!uploadResponse?.secure_url) {
		return res.status(500).json({
		  success: false,
		  message: "Video upload failed",
		})
	  }
  
	  // ✅ Create SubSection with videoUrl
	  const newSubSection = await SubSection.create({
		title,
		timeDuration,
		description,
		videoUrl: uploadResponse.secure_url,
	  })
  
	  // ✅ Push SubSection into Section
	  const updatedSection = await Section.findByIdAndUpdate(
		sectionId,
		{ $push: { SubSection: newSubSection._id } },
		{ new: true }
	  ).populate("SubSection")
  
	  if (!updatedSection) {
		return res.status(404).json({
		  success: false,
		  message: "Section not found",
		})
	  }
  
	  return res.status(200).json({
		success: true,
		message: "SubSection created successfully",
		data: updatedSection,
	  })
	} catch (error) {
	  console.error("Add SubSection Error:", error)
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
  }

// UPDATE a subsection
exports.updateSubSection = async (req, res) => {
	try {
		const { subSectionId, title, timeDuration, description, videoUrl } = req.body

		if (!subSectionId) {
			return res.status(400).json({
				success: false,
				message: "SubSection ID is required",
			})
		}

		const updateData = {}
		if (title) updateData.title = title
		if (timeDuration) updateData.timeDuration = timeDuration
		if (description) updateData.description = description
		if (videoUrl) updateData.videoUrl = videoUrl

		const updatedSubSection = await SubSection.findByIdAndUpdate(
			subSectionId,
			updateData,
			{ new: true }
		)

		if (!updatedSubSection) {
			return res.status(404).json({
				success: false,
				message: "SubSection not found",
			})
		}

		res.status(200).json({
			success: true,
			message: "SubSection updated successfully",
			data: updatedSubSection,
		})
	} catch (error) {
		console.error("Error updating subsection:", error)
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		})
	}
}

// DELETE a subsection
exports.deleteSubSection = async (req, res) => {
	try {
		const { subSectionId, sectionId } = req.body

		if (!subSectionId || !sectionId) {
			return res.status(400).json({
				success: false,
				message: "SubSection ID and Section ID are required",
			})
		}

		// Remove subsection from section
		await Section.findByIdAndUpdate(sectionId, {
			$pull: {
				SubSection: subSectionId,
			},
		})

		// Delete the subsection
		const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId)

		if (!deletedSubSection) {
			return res.status(404).json({
				success: false,
				message: "SubSection not found",
			})
		}

		res.status(200).json({
			success: true,
			message: "SubSection deleted successfully",
		})
	} catch (error) {
		console.error("Error deleting subsection:", error)
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		})
	}
}
