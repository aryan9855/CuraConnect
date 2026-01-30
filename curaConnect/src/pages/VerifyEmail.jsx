import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import OTPInput from "react-otp-input"
import { useNavigate, Link } from "react-router-dom"
import { sendOtp, signUp } from "../services/operations/authAPI"
import Loader from "../components/core/HomePage/common/Loader"
import { toast } from "react-hot-toast"

function VerifyEmail() {
  const [otp, setOtp] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { signupData, loading } = useSelector((state) => state.auth)

  // 🚨 If user refreshes or opens this page directly
  useEffect(() => {
    if (!signupData) {
      toast.error("Please sign up again")
      navigate("/signup")
    }
  }, [signupData, navigate])

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP")
      return
    }

    // 🔥 HARD STOP: accountType MUST exist
    if (!signupData?.accountType) {
      toast.error("Signup data corrupted. Please sign up again.")
      navigate("/signup")
      return
    }

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData

    console.log("SIGNUP DATA:", signupData)
    console.log("OTP:", otp)
    console.log("FINAL ACCOUNT TYPE:", accountType)

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-richblack-900 px-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-md rounded-2xl bg-richblack-800/80 backdrop-blur-md p-8 shadow-xl border border-richblack-700">

          {/* Heading */}
          <h1 className="text-2xl font-bold text-richblack-5 mb-2">
            Verify your email 📩
          </h1>

          {/* Description */}
          <p className="text-sm text-richblack-300 mb-6">
            Enter the 6-digit verification code sent to your email.
          </p>

          {/* Form */}
          <form onSubmit={handleOnSubmit} className="space-y-6">

            {/* OTP Input */}
            <div className="flex justify-center">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                shouldAutoFocus
                renderInput={(props) => (
                  <input
                    {...props}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="
                      mx-2 h-14 w-14 sm:h-16 sm:w-16
                      rounded-xl bg-richblack-900
                      text-center text-2xl font-bold text-richblack-5
                      border border-richblack-700
                      focus:outline-none focus:ring-2 focus:ring-cyan-400
                      transition-all duration-200
                      [appearance:textfield]
                      [&::-webkit-outer-spin-button]:appearance-none
                      [&::-webkit-inner-spin-button]:appearance-none
                    "
                  />
                )}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="
                w-full rounded-lg
                bg-gradient-to-r from-cyan-400 to-blue-500
                py-3 font-semibold text-white
                hover:from-blue-500 hover:to-cyan-400
                transition-all duration-200
              "
            >
              Verify Email
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <Link
              to="/login"
              className="text-richblack-300 hover:text-cyan-400 transition"
            >
              ← Back to Login
            </Link>

            <button
              onClick={() => dispatch(sendOtp(signupData.email, navigate))}
              className="text-cyan-400 hover:text-cyan-300 transition"
            >
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default VerifyEmail
