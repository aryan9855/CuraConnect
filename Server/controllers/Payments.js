const {instance}= require("../config/razorpay")
const HealthProgram = require("../models/HealthProgram")
const User = require("../models/User")
const crypto = require("crypto")
const  mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")

const {HealthProgramEnrollmentEmail} = require("../mail/templates/healthProgramEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const HealthProgramProgress = require("../models/HealthProgramProgress")

//capture the payment and initaite the RazorPay order
exports.capturePayment = async(req , res)=>{
    try {
        //get healthProgramIds and userId
        const healthPrograms = req.body.healthPrograms || req.body.healthProgram_id ? [req.body.healthProgram_id] : []
        const userId = req.user.id
        
        //validation
        if (!healthPrograms || healthPrograms.length === 0) {
            return res.status(400).json({ success: false, message: "Please provide healthProgram ID" })
        }

        let total_amount = 0

        for (const healthProgram_id of healthPrograms) {
        //valid healthProgramDetails
        let healthProgram;
        try {
            healthProgram = await HealthProgram.findById(healthProgram_id)
            if(!healthProgram){
                return res.json({
                    success:false,
                    message:'could not find the healthProgram'
                })
            }
            //user already pay for the same healthProgram
            const uid = new mongoose.Types.ObjectId(userId)
            if(healthProgram.patientEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:'Patient is already enrolled'
                })
            }
            total_amount += healthProgram.price
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }
    

            const options = {
                amount: total_amount * 100,
                currency: "INR",
                receipt: Math.random(Date.now()).toString()
            }
            try {
                //initiate the payment using razorpay
                const paymentResponse = await instance.orders.create(options)
                console.log(paymentResponse)

                //return response
                return res.status(200).json({
                    success:true,
                    data:paymentResponse
                })
            } catch (error) {
                console.error(error)
                return res.status(500).json({
                    success:false,
                    message:"Could not initiate order"
                })
            }
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//verify signature of razorpay and server
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const healthPrograms = req.body?.healthPrograms
  
    const userId = req.user.id
  
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !healthPrograms ||
      !userId
    ) {
      return res.status(200).json({ success: false, message: "Payment Failed" })
    }
  
    const body = razorpay_order_id + "|" + razorpay_payment_id
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex")
  
    if (expectedSignature === razorpay_signature) {
      await enrollPatients(healthPrograms, userId, res)
      return res.status(200).json({ success: true, message: "Payment Verified" })
    }
  
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }
  
  // Send Payment Success Email
  exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
    const userId = req.user.id
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
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
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }
  
  // enroll the patient in the health programs
  const enrollPatients = async (healthPrograms, userId, res) => {
    if (!healthPrograms || !userId) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Health Program ID and User ID",
      })
    }
  
    for (const healthProgramId of healthPrograms) {
      try {
        // Find the health program and enroll the patient
        const enrolledHealthProgram = await HealthProgram.findOneAndUpdate(
          { _id: healthProgramId },
          { $push: { patientEnrolled: userId } },
          { new: true }
        )
  
        if (!enrolledHealthProgram) {
          return res
            .status(500)
            .json({ success: false, error: "Health Program not found" })
        }
  
        console.log("Updated health program: ", enrolledHealthProgram)
  
        const healthProgramProgress = await HealthProgramProgress.create({
          healthProgramID: healthProgramId,
          userId: userId,
          completedVideos: [],
        })
  
        // Add health program to patient's list
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
  
        console.log("Enrolled patient: ", enrolledPatient)
  
        // Send email notification
        const emailResponse = await mailSender(
          enrolledPatient.email,
          `Successfully Enrolled into ${enrolledHealthProgram.healthProgramName}`,
          healthProgramEnrollmentEmail(
            enrolledHealthProgram.healthProgramName,
            `${enrolledPatient.firstName} ${enrolledPatient.lastName}`
          )
        )
  
        console.log("Email sent successfully: ", emailResponse.response)
      } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
      }
    }
  }
  