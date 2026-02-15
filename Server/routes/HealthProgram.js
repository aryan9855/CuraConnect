const express = require("express");
const router = express.Router();

// ================== CONTROLLERS ==================

const {
  createHealthProgram,
  getAllHealthPrograms,
  getHealthProgramDetails,
  getFullHealthProgramDetails,
  editHealthProgram,
  getDoctorHealthPrograms,
  deleteHealthProgram,
  unenrollFromHealthProgram,
} = require("../controllers/HealthProgram");

const {
  createRating,
  getAverageRating,
  getAllRating
} = require("../controllers/RatingAndReview");



const { updateHealthProgramProgress } =
  require("../controllers/HealthProgramProgress");


const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controllers/Category");

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

// ================== MIDDLEWARES ==================

const {
  auth,
  isDoctor,
  isPatient,
  isAdmin,
} = require("../middlewares/auth");

// ================== HEALTH PROGRAM ROUTES ==================

router.post("/createHealthProgram", auth, isDoctor, createHealthProgram);

router.get("/getAllHealthPrograms", getAllHealthPrograms);

router.post("/getHealthProgramDetails", getHealthProgramDetails);

router.post(
  "/getFullHealthProgramDetails",
  auth,
  getFullHealthProgramDetails
);

router.post("/editHealthProgram", auth, isDoctor, editHealthProgram);

router.get(
  "/getDoctorHealthPrograms",
  auth,
  isDoctor,
  getDoctorHealthPrograms
);

router.delete(
  "/deleteHealthProgram",
  auth,
  isDoctor,
  deleteHealthProgram
);

// ================== PROGRESS ==================

router.post(
  "/updateHealthProgramProgress",
  auth,
  isPatient,
  updateHealthProgramProgress
);


// ================== CATEGORY ==================

router.post("/createCategory", auth, isAdmin, createCategory);

router.get("/showAllCategories", showAllCategories);

router.post("/getCategoryPageDetails", categoryPageDetails);

// ================== SECTION ==================

router.post("/addSection", auth, isDoctor, addSection);

router.post("/updateSection", auth, isDoctor, updateSection);

router.post("/deleteSection", auth, isDoctor, deleteSection);

// ================== SUBSECTION ==================

router.post("/addSubSection", auth, isDoctor, addSubSection);

router.post("/updateSubSection", auth, isDoctor, updateSubSection);

router.post("/deleteSubSection", auth, isDoctor, deleteSubSection);

// ================== UNENROLL ==================

router.post(
  "/unenroll",
  auth,
  isPatient,
  unenrollFromHealthProgram
);
// ================== RATING ROUTES ==================

router.post(
  "/createRating",
  auth,
  isPatient,
  createRating
);

router.post(
  "/getAverageRating",
  getAverageRating
);

router.get(
  "/getAllRating",
  getAllRating
);


module.exports = router;
