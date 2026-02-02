import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="my-14 rounded-xl border border-red-500/30 bg-red-500/5 p-6 backdrop-blur-md">
      <div className="flex gap-5">
        <div className="h-14 w-14 rounded-full bg-red-500/20 flex items-center justify-center">
          <FiTrash2 className="text-2xl text-red-400" />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-red-300">
            Delete Account
          </h2>

          <p className="text-sm text-richblack-300 max-w-xl">
            This action is permanent. All data will be deleted.
          </p>

          <button
            onClick={() => dispatch(deleteProfile(token, navigate))}
            className="text-sm italic text-red-400 hover:text-red-300 hover:underline"
          >
            I understand, delete my account
          </button>
        </div>
      </div>
    </div>
  )
}
