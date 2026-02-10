const {instance}= require("../config/razorpay")
const HealthProgram = require("../models/HealthProgram")
const User = require("../models/User")
const crypto = require("crypto")
const  mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")

const {healthProgramEnrollmentEmail} = require("../mail/templates/healthProgramEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const HealthProgramProgress = require("../models/HealthProgramProgress")




//capture the payment and initaite the RazorPay order
exports.capturePayment = async (req, res) => {
  try {
    const { healthPrograms } = req.body
    const userId = req.user.id

    if (!healthPrograms || healthPrograms.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide Health Program IDs",
      })
    }

    let total_amount = 0

    for (const healthProgram_id of healthPrograms) {
      const healthProgram = await HealthProgram.findById(healthProgram_id)

      if (!healthProgram) {
        return res.status(404).json({
          success: false,
          message: "Health Program not found",
        })
      }

      const uid = new mongoose.Types.ObjectId(userId)

      if (healthProgram.patientEnrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: "Patient already enrolled",
        })
      }

      total_amount += healthProgram.price
    }

    const options = {
      amount: total_amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    }

    const paymentResponse = await instance.orders.create(options)

    return res.status(200).json({
      success: true,
      data: paymentResponse,
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Could not initiate order",
    })
  }
}


//verify signature of razorpay and server
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      healthPrograms,
    } = req.body

    const userId = req.user.id

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !healthPrograms
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment Failed",
      })
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment Verification Failed",
      })
    }

    // enroll user
    await enrollPatients(healthPrograms, userId)

    return res.status(200).json({
      success: true,
      message: "Payment Verified & User Enrolled",
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    })
  }
}

  
  // Send Payment Success Email
  exports.sendPaymentSuccessEmail = async (req, res) => {
    try {
      const { orderId, paymentId, amount } = req.body
      const userId = req.user.id
  
      if (!orderId || !paymentId || !amount) {
        return res.status(400).json({
          success: false,
          message: "Please provide all details",
        })
      }
  
      const enrolledPatient = await User.findById(userId)
  
      await mailSender(
        enrolledPatient.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${enrolledPatient.firstName} ${enrolledPatient.lastName}`,
          amount / 100,
          orderId,
          paymentId
        )
      )
  
      return res.status(200).json({
        success: true,
        message: "Payment email sent successfully",
      })
  
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "Could not send email",
      })
    }
  }
  
  
  // enroll the patient in the health programs
  const enrollPatients = async (healthPrograms, userId) => {
    for (const healthProgramId of healthPrograms) {
  
      const enrolledHealthProgram = await HealthProgram.findByIdAndUpdate(
        healthProgramId,
        { $push: { patientEnrolled: userId } },
        { new: true }
      )
  
      if (!enrolledHealthProgram) {
        throw new Error("Health Program not found")
      }
  
      const healthProgramProgress = await HealthProgramProgress.create({
        healthProgramID: healthProgramId,
        userId: userId,
        completedVideos: [],
      })
  
      const enrolledPatient = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            healthProgram: healthProgramId,
            healthProgramProgress: healthProgramProgress._id,
          },
        },
        { new: true }
      )
  
      await mailSender(
        enrolledPatient.email,
        `Successfully Enrolled into ${enrolledHealthProgram.healthProgramName}`,
        healthProgramEnrollmentEmail(
          enrolledHealthProgram.healthProgramName,
          `${enrolledPatient.firstName} ${enrolledPatient.lastName}`
        )
      )
    }
  }
  
  