const mongoose = require("mongoose");
const { mailSender } = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email from Cura Connect",
      emailTemplate(otp)
    );
    console.log("Email sent successfully:", mailResponse?.response);
  } catch (error) {
    console.log("error occurred while sending mail:", error);
    throw error;
  }
}

// ✅ ASYNC MIDDLEWARE → NO `next`
OTPSchema.pre("save", async function () {
  console.log("New document saved to database");

  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
});

module.exports = mongoose.model("OTP", OTPSchema);
