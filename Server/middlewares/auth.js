const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      })
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    })
  }
}

// ================= ROLES =================

exports.isPatient = (req, res, next) => {
  if (req.user.accountType !== "Patient") {
    return res.status(401).json({
      success: false,
      message: "Protected route for Patients only",
    })
  }
  next()
}

exports.isDoctor = (req, res, next) => {
  if (req.user.accountType !== "Doctor") {
    return res.status(401).json({
      success: false,
      message: "Protected route for Doctors only",
    })
  }
  next()
}

exports.isAdmin = (req, res, next) => {
  if (req.user.accountType !== "Admin") {
    return res.status(401).json({
      success: false,
      message: "Protected route for Admins only",
    })
  }
  next()
}
