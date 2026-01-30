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

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("All fields are required")
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    const signupData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
    }

    dispatch(setSignupData(signupData))
    dispatch(sendOtp(email, navigate))
  }

  const tabData = [
    { id: 1, tabName: "Patient", type: ACCOUNT_TYPE.PATIENT },
    { id: 2, tabName: "Doctor", type: ACCOUNT_TYPE.DOCTOR },
  ]

  return (
    <div>
      {/* Role Selection */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      <form className="mt-6 flex w-full flex-col gap-y-5" onSubmit={handleOnSubmit}>

        {/* Name */}
        <div className="flex gap-x-4">
          <input
            required
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleOnChange}
            placeholder="First name"
            className="w-full rounded-lg bg-richblack-800 px-3 py-2 text-richblack-5"
          />
          <input
            required
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleOnChange}
            placeholder="Last name"
            className="w-full rounded-lg bg-richblack-800 px-3 py-2 text-richblack-5"
          />
        </div>

        {/* Email */}
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="you@gmail.com"
          className="w-full rounded-lg bg-richblack-800 px-3 py-2 text-richblack-5"
        />

        {/* ================= PASSWORDS (WITH EYES) ================= */}
        <div className="flex gap-x-4">

          {/* Password */}
          <label className="relative w-full">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
               autoComplete="new-password"
              placeholder="Password"
              className="w-full rounded-lg bg-richblack-800 px-3 py-2 pr-12
                         text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2
                         cursor-pointer text-richblack-300 hover:text-blue-400"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </span>
          </label>

          {/* Confirm Password */}
          <label className="relative w-full">
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
               autoComplete="new-password"
              placeholder="Confirm password"
              className="w-full rounded-lg bg-richblack-800 px-3 py-2 pr-12
                         text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2
                         cursor-pointer text-richblack-300 hover:text-blue-400"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500
                     py-2 font-semibold text-white"
        >
          Create CuraConnect Account
        </button>
      </form>
    </div>
  )
}

export default SignupForm
