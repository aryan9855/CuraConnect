const express = require("express");
const router = express.Router();

// ================== Controllers ==================

// HealthProgram Controllers
const {
  createHealthProgram,
  getAllHealthPrograms,
  getHealthProgramDetails,
  getFullHealthProgramDetails,
  editHealthProgram,
  getDoctorHealthPrograms,
  deleteHealthProgram,
  unenrollFromHealthProgram,   // ✅ ADDED THIS
} = require("../controllers/HealthProgram");

// HealthProgram Progress
const {
  updateHealthProgramProgress,
} = require("../controllers/HealthProgramProgress");

// Category Controllers
const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controllers/Category");

// ================== Middlewares ==================

const {
  auth,
  isDoctor,
  isPatient,
  isAdmin,
} = require("../middlewares/auth");

const {
  addSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

const {
  addSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

// ================== HEALTH PROGRAM ROUTES ==================

router.post("/createHealthProgram", auth, isDoctor, createHealthProgram);
router.get("/getAllHealthPrograms", getAllHealthPrograms);
router.post("/getHealthProgramDetails", getHealthProgramDetails);
router.post("/getFullHealthProgramDetails", auth, getFullHealthProgramDetails);
router.post("/editHealthProgram", auth, isDoctor, editHealthProgram);
router.get("/getDoctorHealthPrograms", auth, isDoctor, getDoctorHealthPrograms);
router.delete("/deleteHealthProgram", auth, isDoctor, deleteHealthProgram);

router.post(
  "/updateHealthProgramProgress",
  auth,
  isPatient,
  updateHealthProgramProgress
);

// ================== CATEGORY ROUTES ==================

// Admin creates category
router.post("/createCategory", auth, isAdmin, createCategory);

// Get all categories
router.get("/showAllCategories", showAllCategories);

// Category page details
router.post("/getCategoryPageDetails", categoryPageDetails);

// ================== SECTION ROUTES ==================

router.post("/addSection", auth, isDoctor, addSection);
router.post("/updateSection", auth, isDoctor, updateSection);
router.post("/deleteSection", auth, isDoctor, deleteSection);

// ================== SUB SECTION ROUTES ==================

router.post("/addSubSection", auth, isDoctor, addSubSection);
router.post("/updateSubSection", auth, isDoctor, updateSubSection);
router.post("/deleteSubSection", auth, isDoctor, deleteSubSection);

// ================== UNENROLL ROUTE ==================

router.post(
  "/unenroll",
  auth,
  isPatient,
  unenrollFromHealthProgram   // ✅ NOW PROPERLY IMPORTED
);

module.exports = router;
