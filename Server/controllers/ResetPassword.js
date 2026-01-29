const User = require("../models/User")
const { mailSender } = require("../utils/mailSender")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

//resetPasswordToken
exports.resetPasswordToken = async(req , res)=>{
    try {
            // get email from req body
    const email = req.body.email;
    //check user for this email , validation
    const user = await User.findOne({email:email})
    if(!user){
        return res.json({
            success:false,
            message:'Your Email is not registered with us'
        })
    }
    //generate token 
    const token = crypto.randomUUID();
    //update user by adding token and expiration time 
    const updatedDetails = await User.findOneAndUpdate({email:email},
        {
            token : token,
            resetPasswordExpire:Date.now()+5*60*1000
        },
    {new:true})
    //create url
    const url = `${process.env.FRONTEND_URL}/update-password/${token}`

    //send mail containing URL
    await mailSender(email , "Password Reset Link", `Password Reset Link : ${url}`)
    //return response
    return res.json({
        success:true,
        message:'Email is sent Successfully please check email to change the password'

    }) 
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'Something went wrong during Reset password'
    
        })
    }
}


//resetPassword

exports.resetPassword = async ( req , res) =>{
    try {
         //data fetch 
    const {password , confirmPassword , token} = req.body
    //validation
    if(password !== confirmPassword){
        return res.json({
            success: false,
            message:'Password not matching'
        })
    }
    //get user details from db using token
    const userDetails = await User.findOne({token:token})
    //if no entry ->  invalid token
    if(!userDetails){
        return res.json({
            success:false,
            message:'Token is invalid'
        })
    }
    //token time check
    if(userDetails.resetPasswordExpire < Date.now()){
        return res.json({
            success:false,
            message:'Token is expired'
        })
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password,10)
    //password update
    await User.findOneAndUpdate(
        {token : token},
        {password : hashedPassword},
        {new :true}
    )
    //return response
    return res.status(200).json({
        success:true,
        message:'Password reset successfull'
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'Something went wrong during Reset password'
    
        })
    }
}

