const mongoose = required("mongoose")
const mailSender = require("../utils/mailSender")
const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        defaulr:Date.now(),
        expires:5*60
    }
})

async function sendVerificationEmail(){
    try {
        const mailResponce = await mailSender(email , "Verfication Email from Cura Connect " , otp)
        console.log("Email sent succesfuuly :",mailResponce)
    } catch (error) {
        console.log("error occured whike sending mail : " , error)
        throw(error)
    }
}

OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email,this.otp)
    next();
} )

module.exports = mongoose.model("OTP",OTPSchema)