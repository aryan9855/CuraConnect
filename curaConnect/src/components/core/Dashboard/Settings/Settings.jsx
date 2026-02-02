import ChangeProfilePicture from "./ChangeProfilePicture"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"
import DeleteAccount from "./DeleteAccount"

export default function Settings() {
  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4">
      <h1 className="mb-12 text-3xl font-semibold text-cyan-300">
        Account Settings
      </h1>

      <div className="space-y-14">
        <ChangeProfilePicture />
        <EditProfile />
        <UpdatePassword />
        <DeleteAccount />
      </div>
    </div>
  )
}
