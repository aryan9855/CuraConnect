const mongoose = required("mongoose")

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

module.exports = mongoose.model("OTP",OTPSchema)