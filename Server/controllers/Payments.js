const { instance } = require("../config/razorpay");
const HealthProgram = require("../models/HealthProgram");
const User = require("../models/User");
const crypto = require("crypto");
const { mailSender } = require("../utils/mailSender");
const mongoose = require("mongoose");

const { healthProgramEnrollmentEmail } = require("../mail/templates/healthProgramEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const HealthProgramProgress = require("../models/HealthProgramProgress");


// ================= CAPTURE PAYMENT =================
exports.capturePayment = async (req, res) => {
  try {
    const { healthPrograms } = req.body;
    const userId = req.user.id || req.user._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!healthPrograms || healthPrograms.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide Health Program IDs",
      });
    }

    let total_amount = 0;

    for (const healthProgramId of healthPrograms) {
      const healthProgram = await HealthProgram.findById(healthProgramId);

      if (!healthProgram) {
        return res.status(404).json({
          success: false,
          message: "Health Program not found",
        });
      }

      // 🔴 IMPORTANT: Prevent duplicate purchase
      if (
        healthProgram.patientEnrolled.some(
          (id) => id.toString() === userId.toString()
        )
      ) {
        return res.status(400).json({
          success: false,
          message: `Already enrolled in ${healthProgram.healthProgramName}`,
        });
      }

      total_amount += healthProgram.price;
    }

    const options = {
      amount: total_amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const paymentResponse = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      data: paymentResponse,
    });

  } catch (error) {
    console.error("CAPTURE PAYMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Could not initiate order",
    });
  }
};



// ================= VERIFY PAYMENT =================
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      healthPrograms,
    } = req.body;

    const userId = req.user.id || req.user._id;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !healthPrograms
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment Failed",
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment Verification Failed",
      });
    }

    // 🔐 Safe Enrollment
    await enrollPatients(healthPrograms, userId);

    return res.status(200).json({
      success: true,
      message: "Payment Verified & User Enrolled",
    });

  } catch (error) {
    console.error("VERIFY PAYMENT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};



// ================= SEND SUCCESS EMAIL =================
exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id || req.user._id;

    if (!orderId || !paymentId || !amount) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details",
      });
    }

    const enrolledPatient = await User.findById(userId);

    if (!enrolledPatient) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await mailSender(
      enrolledPatient.email,
      "Payment Received",
      paymentSuccessEmail(
        `${enrolledPatient.firstName} ${enrolledPatient.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );

    return res.status(200).json({
      success: true,
      message: "Payment email sent successfully",
    });

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Could not send email",
    });
  }
};



// ================= ENROLL PATIENT (SECURE VERSION) =================
const enrollPatients = async (healthPrograms, userId) => {

  for (const healthProgramId of healthPrograms) {

    const program = await HealthProgram.findById(healthProgramId);

    if (!program) {
      throw new Error("Health Program not found");
    }

    // 🔴 DOUBLE CHECK (even after payment)
    if (
      program.patientEnrolled.some(
        (id) => id.toString() === userId.toString()
      )
    ) {
      continue; // Skip if already enrolled
    }

    // ✅ Prevent duplicate using $addToSet
    const updatedProgram = await HealthProgram.findByIdAndUpdate(
      healthProgramId,
      { $addToSet: { patientEnrolled: userId } },
      { new: true }
    );

    // Create Progress Only If Not Exists
    const existingProgress = await HealthProgramProgress.findOne({
      healthProgramID: healthProgramId,
      userId: userId,
    });

    let progressDoc;

    if (!existingProgress) {
      progressDoc = await HealthProgramProgress.create({
        healthProgramID: healthProgramId,
        userId: userId,
        completedVideos: [],
      });
    } else {
      progressDoc = existingProgress;
    }

    // Update User (no duplicates)
    const enrolledPatient = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          healthProgram: healthProgramId,
          healthProgramProgress: progressDoc._id,
        },
      },
      { new: true }
    );

    // Send Enrollment Email
    try {
      await mailSender(
        enrolledPatient.email,
        `Successfully Enrolled into ${updatedProgram.healthProgramName}`,
        healthProgramEnrollmentEmail(
          updatedProgram.healthProgramName,
          `${enrolledPatient.firstName} ${enrolledPatient.lastName}`
        )
      );
    } catch (mailError) {
      console.error("Enrollment Mail Error:", mailError);
    }
  }
};
