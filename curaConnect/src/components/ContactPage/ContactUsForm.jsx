import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { apiConnector } from "../../services/apiconnector"
import CountryCode from "../../data/countrycode.json"
import { contactUsEndpoints } from "../../services/apis"

function ContactUsForm() {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      countrycode: "+91", // 🇮🇳 DEFAULT INDIA
    },
  })

  const submitContactForm = async (data) => {
    try {
      setLoading(true)
      const response = await apiConnector(
        "POST",
        contactUsEndpoints.CONTACT_US_API,
        data
      )
      console.log("Contact form response:", response)
    } catch (error) {
      console.log("Contact form error:", error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        countrycode: "+91", // reset back to India
        phoneNo: "",
        message: "",
      })
    }
  }, [isSubmitSuccessful, reset])

  return (
    <div
      className="
        mx-auto max-w-3xl mb-24
        rounded-2xl p-8 md:p-10
        bg-white/10 backdrop-blur-md
        border border-white/20
        shadow-lg
        text-left
      "
    >
      <form
        onSubmit={handleSubmit(submitContactForm)}
        className="flex w-full flex-col gap-y-6 text-left"
      >
        {/* ================= NAME ================= */}
        <div className="flex gap-4">
          <label className="w-full text-left">
            <p className="mb-1 text-sm font-medium text-white">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              {...register("firstname", { required: true })}
              placeholder="First name"
              className="w-full rounded-xl bg-richblack-800/80 px-4 py-2.5
                          text-white ring-1 ring-richblack-700
                         focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.firstname && (
              <span className="text-xs text-pink-200">
                First name is required
              </span>
            )}
          </label>

          <label className="w-full text-left">
            <p className="mb-1 text-sm font-medium text-white">
              Last Name
            </p>
            <input
              {...register("lastname")}
              placeholder="Last name"
              className="w-full rounded-xl bg-richblack-800/80 px-4 py-2.5
                         text-white ring-1 ring-richblack-700
                         focus:ring-2 focus:ring-blue-500 transition"
            />
          </label>
        </div>

        {/* ================= EMAIL ================= */}
        <label className="w-full text-left">
          <p className="mb-1 text-sm font-medium text-richblack-200">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="you@gmail.com"
            className="w-full rounded-xl bg-richblack-800/80 px-4 py-2.5
                       text-white ring-1 ring-richblack-700
                       focus:ring-2 focus:ring-blue-500 transition"
          />
          {errors.email && (
            <span className="text-xs text-pink-200">Email is required</span>
          )}
        </label>

        {/* ================= PHONE ================= */}
        <div className="flex gap-4">
          <label className="w-[35%] text-left">
            <p className="mb-1 text-sm font-medium text-white">
              Code <sup className="text-pink-200">*</sup>
            </p>
            <select
              {...register("countrycode", { required: true })}
              className="w-full rounded-xl bg-richblack-800/80 px-3 py-2.5
                         text-white ring-1 ring-richblack-700
                         focus:ring-2 focus:ring-blue-500 transition"
            >
              {CountryCode.map((item, index) => (
                <option key={index} value={item.code}>
                  {item.code} - {item.country}
                </option>
              ))}
            </select>
          </label>

          <label className="w-full text-left">
            <p className="mb-1 text-sm font-medium text-white">
              Phone Number <sup className="text-pink-200">*</sup>
            </p>
            <input
              {...register("phoneNo", { required: true ,maxLength:{value:10,message:"Invalid Phone number"},minLength:{value:8,message:"Invalid Phone number"}})}
              placeholder="1234567890"
              className="w-full rounded-xl bg-richblack-800/80 px-4 py-2.5
                         text-white ring-1 ring-richblack-700
                         focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.phoneNo && (
              <span className="text-xs text-pink-200">
                Phone number is required
              </span>
            )}
          </label>
        </div>

        {/* ================= MESSAGE ================= */}
        <label className="w-full text-left">
          <p className="mb-1 text-sm font-medium text-white">
            Message <sup className="text-pink-200">*</sup>
          </p>
          <textarea
            rows="5"
            {...register("message", { required: true })}
            placeholder="Write your message..."
            className="w-full rounded-xl bg-richblack-800/80 px-4 py-3
                       text-white ring-1 ring-richblack-700
                       focus:ring-2 focus:ring-blue-500 transition resize-none"
          />
          {errors.message && (
            <span className="text-xs text-pink-200">
              Message is required
            </span>
          )}
        </label>

        {/* ================= SUBMIT ================= */}
        <button
          type="submit"
          disabled={loading}
          className="group relative mt-4 overflow-hidden rounded-xl
                     bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500
                     py-2.5 font-semibold text-white
                     shadow-lg shadow-blue-500/25
                     transition-all duration-300
                     hover:shadow-blue-500/40
                     active:scale-[0.98]"
        >
          <span className="relative z-10">
            {loading ? "Sending..." : "Send Message"}
          </span>
          <span
            className="absolute inset-0 -z-10 bg-gradient-to-r
                       from-indigo-500 via-blue-500 to-cyan-400
                       opacity-0 group-hover:opacity-100 transition"
          />
        </button>
      </form>
    </div>
  )
}

export default ContactUsForm
