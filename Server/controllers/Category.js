const Category = require("../models/Category")

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

// ================= CREATE CATEGORY =================
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      })
    }

    const categoryDetails = await Category.create({
      name,
      description,
    })

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: categoryDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// ================= SHOW ALL CATEGORIES =================
const showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    )

    return res.status(200).json({
      success: true,
      data: allCategories,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// ================= CATEGORY PAGE DETAILS =================
const categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      })
    }

    // 🔹 Selected Category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "healthPrograms",
        match: { status: "Published" },
        populate: {
          path: "doctor",
        },
      })
      .exec()

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      })
    }

    // 🔥 Added missing check (from old code logic)
    if (!selectedCategory.healthPrograms || selectedCategory.healthPrograms.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No health programs found for this category",
      })
    }

    // 🔹 Other Categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })

    let differentCategory = null

    if (categoriesExceptSelected.length > 0) {
      differentCategory = await Category.findById(
        categoriesExceptSelected[
          getRandomInt(categoriesExceptSelected.length)
        ]._id
      )
        .populate({
          path: "healthPrograms",
          match: { status: "Published" },
          populate: {
            path: "doctor",
          },
        })
        .exec()
    }

    // 🔹 Most Enrolled Health Programs
    const allCategories = await Category.find().populate({
      path: "healthPrograms",
      match: { status: "Published" },
      populate: {
        path: "doctor",
      },
    })

    const allHealthPrograms = allCategories.flatMap(
      (cat) => cat.healthPrograms
    )

    const mostEnrolledHealthPrograms = allHealthPrograms
      .sort(
        (a, b) =>
          (b.patientEnrolled?.length || 0) -
          (a.patientEnrolled?.length || 0)
      )
      .slice(0, 10)

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostEnrolledHealthPrograms,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

module.exports = {
  createCategory,
  showAllCategories,
  categoryPageDetails,
}
