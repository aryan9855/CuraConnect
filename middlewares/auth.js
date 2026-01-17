const jwt = require("jsonwebtoken")
require("dotenv").config()
const User = require("../models/User")
//auth 
exports.auth = async(req, res,next)=>{
    try {
        //extract token
        const token = req.cookies.token 
                        || req.body.token
                        || req.header("Authorisation").replace("Bearer" ,"")

        //if token is missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token is missing'
            })
        }
        //verify token

        try {
            const decode = jwt.verify(token , process.env.JWT_SECRET)
            console.log(decode)
            req.user = decode
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'token is invalid'
            })
        }
        next();

    } catch (error) {
        return res.status(401).json({
        success: false,
        message:'Something went wrong while validating the token'
    })
    }
}   

//isPatient

exports.isPatient = async (req , res , next)=>{
    try {
        if(req.user.accountTypr !== 'Patient') {
            return res.status(401).json({
                success:false,
                message:'This is a protected toute for Patients only'
            })
        }       
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'User role cannot be verified try again'
        })
    }
}

//isDoctor
exports.isDoctor = async (req , res , next)=>{
    try {
        if(req.user.accountTypr !== 'Doctor') {
            return res.status(401).json({
                success:false,
                message:'This is a protected toute for Doctors only'
            })
        }       
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'User role cannot be verified try again'
        })
    }
}
//isAdmin

exports.isAdmin = async (req , res , next)=>{
    try {
        if(req.user.accountTypr !== 'Admin') {
            return res.status(401).json({
                success:false,
                message:'This is a protected toute for Admins only'
            })
        }       
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'User role cannot be verified try again'
        })
    }
}