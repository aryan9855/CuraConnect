import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import Tab from "../HomePage/common/Tab"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Patient or Doctor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.PATIENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

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

    const signupData = {
      ...formData,
      accountType,
    }

    dispatch(setSignupData(signupData))
    dispatch(sendOtp(email, navigate))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.PATIENT)
  }

  const tabData = [
    {
      id: 1,
      tabName: "Patient",
      type: ACCOUNT_TYPE.PATIENT,
    },
    {
      id: 2,
      tabName: "Doctor",
      type: ACCOUNT_TYPE.DOCTOR,
    },
  ]

  return (
    <div>
      {/* Role Selection */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form onSubmit={handleOnSubmit} className="mt-6 flex w-full flex-col gap-y-5">

        {/* Name */}
        <div className="flex gap-x-4">
          <label className="w-full">
            <p className="mb-1 text-sm text-richblack-25">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="First name"
              className="w-full rounded-lg bg-richblack-800 px-3 py-2 text-richblack-5
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="w-full">
            <p className="mb-1 text-sm text-richblack-25">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Last name"
              className="w-full rounded-lg bg-richblack-800 px-3 py-2 text-richblack-5
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>

        {/* Email */}
        <label className="w-full">
          <p className="mb-1 text-sm text-richblack-25">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="you@gmail.com"
            className="w-full rounded-lg bg-richblack-800 px-3 py-2 text-richblack-5
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Passwords */}
        <div className="flex gap-x-4">
          <label className="relative w-full">
            <p className="mb-1 text-sm text-richblack-25">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Create password"
              className="w-full rounded-lg bg-richblack-800 px-3 py-2 pr-10 text-richblack-5
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer text-richblack-300 hover:text-blue-400"
            >
              {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </span>
          </label>

          <label className="relative w-full">
            <p className="mb-1 text-sm text-richblack-25">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm password"
              className="w-full rounded-lg bg-richblack-800 px-3 py-2 pr-10 text-richblack-5
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] cursor-pointer text-richblack-300 hover:text-blue-400"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500
                     py-2 font-semibold text-white
                     hover:from-blue-500 hover:to-cyan-400 transition-all"
        >
          Create CuraConnect Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm
