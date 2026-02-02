import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../HomePage/common/IconBtn"

const genders = ["Male", "Female", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitProfileForm = (data) => {
    dispatch(updateProfile(token, data))
  }

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      <div className="my-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-lg">
        <h2 className="mb-6 text-lg font-semibold text-cyan-300">
          Profile Information
        </h2>

        {/* Name */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-richblack-300">First Name</label>
            <input
              className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-2
                         text-richblack-5 focus:ring-2 focus:ring-cyan-400/40"
              {...register("firstName", { required: true })}
              defaultValue={user?.firstName}
            />
            {errors.firstName && (
              <p className="text-xs text-yellow-200">Required</p>
            )}
          </div>

          <div>
            <label className="text-sm text-richblack-300">Last Name</label>
            <input
              className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-2
                         text-richblack-5 focus:ring-2 focus:ring-cyan-400/40"
              {...register("lastName", { required: true })}
              defaultValue={user?.lastName}
            />
          </div>
        </div>

        {/* DOB & Gender */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <input
            type="date"
            className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-2
                       text-richblack-5 focus:ring-2 focus:ring-cyan-400/40"
            {...register("dateOfBirth")}
            defaultValue={user?.additionalDetails?.dateOfBirth}
          />

          <select
            className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-2
                       text-richblack-5 focus:ring-2 focus:ring-cyan-400/40"
            {...register("gender")}
            defaultValue={user?.additionalDetails?.gender}
          >
            {genders.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Contact & About */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <input
            placeholder="Contact Number"
            className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-2
                       text-richblack-5 focus:ring-2 focus:ring-cyan-400/40"
            {...register("contactNumber")}
            defaultValue={user?.additionalDetails?.contactNumber}
          />

          <input
            placeholder="About"
            className="w-full rounded-md bg-white/5 border border-white/10 px-4 py-2
                       text-richblack-5 focus:ring-2 focus:ring-cyan-400/40"
            {...register("about")}
            defaultValue={user?.additionalDetails?.about}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          className="rounded-md bg-richblack-700 px-5 py-2 text-richblack-50"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Save Changes" />
      </div>
    </form>
  )
}
