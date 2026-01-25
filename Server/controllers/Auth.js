const User = require("../models/User")
const OTP = require("../models/OTP")
const crypto = require("crypto") 
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { mailSender } = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate")
const Profile = require("../models/Profile")
require("dotenv").config()

// send otp
exports.sendotp = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Check if user already exists
      const checkUserPresent = await User.findOne({ email });
      if (checkUserPresent) {
        return res.status(401).json({
          success: false,
          message: "User already registered",
        });
      }
  
      // Generate OTP (convert to string)
      const otp = crypto.randomInt(100000, 999999).toString();
  
      // Save OTP in DB as STRING
      await OTP.create({ email, otp });
  
      // Send OTP via email
      await mailSender(
        email,
        "OTP Verification - CuraConnect",
        `<h2>Your OTP is ${otp}</h2><p>This OTP is valid for 5 minutes.</p>`
      );
  
      return res.status(200).json({
        success: true,
        message: "OTP sent successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  

// signup
exports.signup = async (req, res) => {
    try {
      // fetch data
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp,
      } = req.body;
  
      // validate required fields
      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword ||
        !accountType ||
        !otp
      ) {
        return res.status(403).json({
          success: false,
          message: "All required fields are missing",
        });
      }
  
      // password match check
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Password and confirm password do not match",
        });
      }
  
      // check existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User is already registered",
        });
      }
  
      // find latest OTP
      const recentOtp = await OTP.find({ email })
        .sort({ createdAt: -1 })
        .limit(1);
  
      if (recentOtp.length === 0) {
        return res.status(400).json({
          success: false,
          message: "OTP not found",
        });
      }
  
      // ✅ FIX 1: SAFE OTP COMPARISON
      if (String(otp) !== String(recentOtp[0].otp)) {
        return res.status(400).json({
          success: false,
          message: "OTP did not match",
        });
      }
  
      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // create profile (contactNumber optional)
      const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: contactNumber || null,
      });
  
      // create user
      const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber: contactNumber || null,
        password: hashedPassword,
        accountType,
        additionalDetails: profileDetails._id,
        image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`,
      });
  
      // ✅ FIX 2: DELETE OTP AFTER SUCCESSFUL SIGNUP
      await OTP.deleteMany({ email });
  
      return res.status(200).json({
        success: true,
        message: "User is registered successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "User cannot be registered. Please try again",
      });
    }
  };
  
//login
exports.login = async (req , res) =>{
    try {
        //get data from req body
        const {email , password} = req.body

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
                expiresIn:"2h"
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
    try {
        // Get user data from req.user
        const userDetails = await User.findById(req.user.id)
        if (!userDetails) {
          return res.status(404).json({
            success: false,
            message: "User not found"
          })
        }
    
        // Get old password, new password, and confirm new password from req.body
        const { oldPassword, newPassword } = req.body
    
        // Validate old password
        const isPasswordMatch = await bcrypt.compare(
          oldPassword,
          userDetails.password
        )
        if (!isPasswordMatch) {
          // If old password does not match, return a 401 (Unauthorized) error
          return res.status(401).json({
            success: false,
            message: "The password is incorrect" 
        })
        }
    
        // Update password
        const encryptedPassword = await bcrypt.hash(newPassword, 10)
        const updatedUserDetails = await User.findByIdAndUpdate(
          req.user.id,
          { password: encryptedPassword },
          { new: true }
        )
    
        // Send notification email
        try {
          const emailResponse = await mailSender(
            updatedUserDetails.email,
            "Password for your account has been updated",
            passwordUpdated(
              updatedUserDetails.email,
              `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
            )
          )
          console.log("Email sent successfully:", emailResponse.response)
        } catch (error) {
          // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
          console.error("Error occurred while sending email:", error)
          return res.status(500).json({
            success: false,
            message: "Error occurred while sending email",
            error: error.message,
          })
        }
    
        // Return success response
        return res
          .status(200)
          .json({ success: true, message: "Password updated successfully" })
      } catch (error) {
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while updating password:", error)
        return res.status(500).json({
          success: false,
          message: "Error occurred while updating password",
          error: error.message,
        })
      }
    }