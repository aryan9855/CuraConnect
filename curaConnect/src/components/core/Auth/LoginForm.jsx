import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../../services/operations/authAPI"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
      <form
        onSubmit={handleOnSubmit}
        className="mt-8 flex w-full flex-col gap-y-6"
      >
        {/* ================= EMAIL ================= */}
        <label className="w-full">
          <p className="mb-1 text-sm font-medium text-richblack-200">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
    
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="you@hospital.com"
            className="w-full rounded-xl bg-richblack-800/80 px-4 py-2.5
                       text-richblack-5 placeholder-richblack-400
                       ring-1 ring-richblack-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       transition-all duration-200"
          />
        </label>
    
        {/* ================= PASSWORD ================= */}
        <label className="relative w-full">
          <p className="mb-1 text-sm font-medium text-richblack-200">
            Password <sup className="text-pink-200">*</sup>
          </p>
    
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter your secure password"
            className="w-full rounded-xl bg-richblack-800/80 px-4 py-2.5 pr-12
                       text-richblack-5 placeholder-richblack-400
                       ring-1 ring-richblack-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       transition-all duration-200"
          />
    
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-[42px] cursor-pointer
                       text-richblack-300 hover:text-blue-400
                       transition-colors"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={22} />
            ) : (
              <AiOutlineEye size={22} />
            )}
          </span>
    
          <Link to="/forgot-password">
            <p className="mt-2 ml-auto max-w-max text-xs font-medium
                          text-blue-300 hover:text-blue-400 transition">
              Forgot password?
            </p>
          </Link>
        </label>
    
        {/* ================= SUBMIT ================= */}
        <button
          type="submit"
          className="group relative mt-4 overflow-hidden rounded-xl
                     bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500
                     py-2.5 font-semibold text-white
                     shadow-lg shadow-blue-500/25
                     transition-all duration-300
                     hover:shadow-blue-500/40
                     active:scale-[0.98]"
        >
          <span className="relative z-10">Sign In to CuraConnect</span>
    
          {/* animated hover glow */}
          <span
            className="absolute inset-0 -z-10 bg-gradient-to-r
                       from-indigo-500 via-blue-500 to-cyan-400
                       opacity-0 transition-opacity duration-300
                       group-hover:opacity-100"
          />
        </button>
      </form>    
  )
}

export default LoginForm