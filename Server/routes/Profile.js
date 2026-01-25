const express = require("express");
const router = express.Router();

const { auth, isDoctor } = require("../middlewares/auth");

const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledHealthPrograms,
  doctorDashboard,
} = require("../controllers/Profile");

// Delete User Account
router.delete("/deleteProfile", auth, deleteAccount);

// Update User Profile
router.put("/updateProfile", auth, updateProfile);

// Get Logged-in User Details
router.get("/getUserDetails", auth, getAllUserDetails);

// Get Enrolled Health Programs
router.get("/getEnrolledHealthPrograms", auth, getEnrolledHealthPrograms);

// Update Profile Picture
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

// Doctor Dashboard
router.get("/doctorDashboard", auth, isDoctor, doctorDashboard);

module.exports = router;
