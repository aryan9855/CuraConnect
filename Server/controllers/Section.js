const Section = require("../models/Section")
const HealthProgram = require("../models/HealthProgram")
const SubSection = require("../models/SubSection")

// CREATE a new section
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
					path: "SubSection",
				},
			})
			.exec()

		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedHealthProgram,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		})
	}
}

// UPDATE a section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId, healthProgramId } = req.body

		const section = await Section.findByIdAndUpdate(
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

		res.status(200).json({
			success: true,
			message: section,
			data: healthProgram,
		})
	} catch (error) {
		console.error("Error updating section:", error)
		res.status(500).json({
			success: false,
			message: "Internal server error",
		})
	}
}

// DELETE a section
exports.deleteSection = async (req, res) => {
	try {
		const { sectionId, healthProgramId } = req.body

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

		// delete subsections
		if (section.SubSection && Array.isArray(section.SubSection)) {
			await SubSection.deleteMany({ _id: { $in: section.SubSection } })
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

		res.status(200).json({
			success: true,
			message: "Section deleted",
			data: healthProgram,
		})
	} catch (error) {
		console.error("Error deleting section:", error)
		res.status(500).json({
			success: false,
			message: "Internal server error",
		})
	}
}
