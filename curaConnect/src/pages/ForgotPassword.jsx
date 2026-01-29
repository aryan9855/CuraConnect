import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getPasswordResetToken } from "../services/operations/authAPI"
import Loader from "../components/core/HomePage/common/Loader"


function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState("")
  const { loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const handleOnSubmit = (e)=>{
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))

  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-richblack-900 px-4">
      {loading ? (
  <div className="flex min-h-screen items-center justify-center">
    <Loader />
  </div>
) : (
  <div className="w-full max-w-md rounded-xl bg-richblack-800 p-6 shadow-lg">       
          {/* Heading */}
          <h1 className="text-2xl font-semibold text-richblack-5">
            {!emailSent ? "Reset your password" : "Check your email"}
          </h1>

          {/* Description */}
          <p className="mt-3 text-sm text-richblack-300">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don't have access to your email, we can try account recovery."
              : `We have sent a password reset link to ${email}`}
          </p>

          {/* Form */}
          <form onSubmit={handleOnSubmit} className="mt-6 space-y-4">
            {!emailSent && (
              <label className="block">
                <p className="mb-1 text-sm text-richblack-200">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-lg bg-richblack-900 px-3 py-2 text-richblack-5
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500
                         py-2 font-semibold text-white
                         hover:from-blue-500 hover:to-cyan-400 transition-all"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          {/* Back to login */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              ← Back to login
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword
