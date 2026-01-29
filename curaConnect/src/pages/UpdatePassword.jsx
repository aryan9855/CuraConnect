import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/core/HomePage/common/Loader"
import { resetPassword } from "../services/operations/authAPI"
import { useLocation, Link } from "react-router-dom"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { toast } from "react-hot-toast"

function UpdatePassword() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector((state) => state.auth)

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(password, confirmPassword, token))
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-richblack-900 px-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-md rounded-2xl bg-richblack-800/80 backdrop-blur-md p-8 shadow-xl border border-richblack-700">

          {/* Heading */}
          <h1 className="text-2xl font-bold text-richblack-5 mb-2">
            Reset your password 🔒
          </h1>

          {/* Description */}
          <p className="text-sm text-richblack-300 mb-6">
            Choose a new password for your account.
          </p>

          {/* Form */}
          <form onSubmit={handleOnSubmit} className="space-y-5">

            {/* New Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-richblack-200 mb-1">
                New Password <sup className="text-pink-400">*</sup>
              </label>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter new password"
                className="w-full rounded-lg bg-richblack-900 px-4 py-3 text-richblack-5 placeholder-richblack-400
                           border border-richblack-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-[42px] cursor-pointer text-richblack-300 hover:text-cyan-400 transition"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-richblack-200 mb-1">
                Confirm New Password <sup className="text-pink-400">*</sup>
              </label>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm new password"
                className="w-full rounded-lg bg-richblack-900 px-4 py-3 text-richblack-5 placeholder-richblack-400
                           border border-richblack-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-[42px] cursor-pointer text-richblack-300 hover:text-cyan-400 transition"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </span>
            </div>

            {/* Submit Button (MATCHES ForgotPassword) */}
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500
                         py-3 font-semibold text-white
                         hover:from-blue-500 hover:to-cyan-400
                         transition-all duration-200"
            >
              Reset Password
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-richblack-300 hover:text-cyan-400 transition"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword
