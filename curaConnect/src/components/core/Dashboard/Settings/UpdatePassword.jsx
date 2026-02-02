import { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { changePassword } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../HomePage/common/IconBtn"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)

  return (
    <form onSubmit={handleSubmit((d) => changePassword(token, d))}>
      <div className="my-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg">
        <h2 className="mb-6 text-lg font-semibold text-cyan-300">
          Change Password
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              placeholder="Current Password"
              className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-2
                         text-richblack-5 focus:ring-2 focus:ring-cyan-400/40"
              {...register("oldPassword")}
            />
            <span
              onClick={() => setShowOld(!showOld)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showOld ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              placeholder="New Password"
              className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-2
                         text-richblack-5 focus:ring-2 focus:ring-cyan-400/40"
              {...register("newPassword")}
            />
            <span
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showNew ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-md border border-white/10 px-5 py-2 text-richblack-50"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Update Password" />
      </div>
    </form>
  )
}
