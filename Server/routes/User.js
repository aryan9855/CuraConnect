// Import the required modules
const express = require("express")
const router = express.Router()

// Import Controllers
const {
  login,
  signup,
  sendotp,
  changePassword,
} = require("../controllers/Auth")

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword")

// Middleware
const { auth } = require("../middlewares/auth")

//                                  Authentication routes
// Login (Patient / Doctor / Admin)
router.post("/login", login)

// Signup (Patient / Doctor)
router.post("/signup", signup)

// Send OTP for Email Verification
router.post("/sendotp", sendotp)

// Change Password (Authenticated User)
router.post("/changepassword", auth, changePassword)
//                                  Reset Password routes
// Generate Reset Password Token
router.post("/reset-password-token", resetPasswordToken)

// Reset Password After Verification
router.post("/reset-password", resetPassword)

// Export Router
module.exports = router
