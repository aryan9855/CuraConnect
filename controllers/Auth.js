const User = require("../models/User")
const OTP = require("../models/OTP")
const crypto = require("crypto") 
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

// send otp
exports.sendOTP = async(req, res) => {
   try {
        const { email } = req.body

        const checkUserPresent = await User.findOne({ email })

        if(checkUserPresent){
            return res.status(401).json({
                success: false,
                message: 'User already registered'
            })
        }

        // generate OTP using crypto
        const otp = crypto.randomInt(100000, 999999)
        console.log("OTP generated :", otp)

        const otpPayload = { email, otp }

        // create an entry in DB for otp
        const otpBody = await OTP.create(otpPayload)
        console.log(otpBody)

        return res.status(200).json({
            success: true,
            message: 'OTP sent Successfully',
            otp
        })

   } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
   }
}

//signup
exports.signUp = async (res, req) =>{

     try {
        //data fetch from req body
     const {
        firstName ,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp
     } = req.body


     //validate it 
     if(!firstName || !lastName|| !email || !password || !confirmPassword || !accountType ||
        !contactNumber ||!otp) {
            return res.status(403).json({
                success:false,
                message:'all fields required'
            })
        }
     // match the password with confirm password
     if(password !== confirmPassword){
        res.status(400).json({
            success:false,
            message: 'Password and confirm Password didnot match'
        })
     }
     //check user alreaddy exits or not 
     const existingUser = await User.findOne({email})
     if(existingUser){
        return res.status(400).json({
            success:false,
            message:'User is already registerd'
        })
     }

     //find most recent OTP stored for user 
     const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1)
     console.log(recentOtp)
     //validate the otp
     if(recentOtp.length ==0){
        return res.status(400).json({
            success:false,
            message:'OTP not found'
        })
     }
     else if(otp !== recentOtp.otp){
        return res.status(400).json({
            success:false,
            message:'OTP didnot match'
        })
     }
     //hash password
     const hashedPassword = await bcrypt.hash(password,10)

     //screate entry in dp 
     const profileDetails = await profile.create({
        gender:null,
        dateOfBirtg:null,
        about:null,
        contactNumber:null 
     })
     const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPassword,
        accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`
     })
 //return res
     return res.status(200).json({
        success:true,
        message:'User is registered successfully',
        user
     })
     } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'User cannot be registered. Please try again'
        })
     }
    
}
//login
exports.login = async (req , res) =>{
    try {
        //get data from req body
        const {email , password} = res.body

        //validation
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:'All feilds are required'
            })
        }
        //user exits or not 
        const user = await User.findOne({email}).populate("additionalDetails")
        if(!user){
            return res.status(401).json({
                sucess:false,
                message:'User cannot be registered. Please sigup first'
            })
        }

        //generate JWT token , after password matching
        if(await bcrypt.compare(password,user.password)){
            const payload ={
                email : user.email,
                id:user._id,
                accountType:user.accountType

            }
            const token = jwt.sign(payload , process.env.JWT_SECRET,{
                exprireIn:"2h"
            })
            user.token = token
            user.password = undefined

        //create cookie and send res
        const options ={
            expires: new Date(Date.now() + 3* 24 * 60*60*60*1000),
            httpOnly:true
        }
        res.cookie("token" ,token, options).status(200).json({
            success:true,
            token,
            user,
            meaasge:"Logged in succesfully"
        })

    }
    else{
        return res.status(401).json({
            success:false,
            message:'Password is incorrect'
        })
    }
 } catch (error) {
    console.log(error)
    return res.status(500).json({
        success:false,
        message:'Login failed. Please try again'
    })
    }
}

//change password
exports.changePassword = async (req , res)=>{
    //get data from req body
    //get oldPassword , newPassword and confirmNewPassword
    // validation

    //update pwd in DB
    //send mail - password updated
    //return response

}
