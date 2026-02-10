// Import the required modules
const express = require("express")
const router = express.Router()

// Payment Controllers
const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/Payments")

// Middlewares
const {
  auth,
  isDoctor,
  isPatient,
  isAdmin,
} = require("../middlewares/auth")

//Payments routes
// Capture payment for Health Program (Patient)
router.post("/capturePayment", auth, isPatient, capturePayment)

// Verify payment
router.post("/verifyPayment", auth, isPatient, verifyPayment)

// Send payment success email
router.post("/sendPaymentSuccessEmail",auth,isPatient, sendPaymentSuccessEmail)

module.exports = router
