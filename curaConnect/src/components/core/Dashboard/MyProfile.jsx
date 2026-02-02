import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../HomePage/common/IconBtn'
import { VscEdit } from 'react-icons/vsc'

function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  const initials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`
      : 'U'

  return (
    <div className="text-richblack-5 space-y-10">
      <h1 className="text-3xl font-semibold text-cyan-400">
        My Profile
      </h1>

      {/* PROFILE CARD */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-[0_10px_50px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-5">

            {/* ✅ FIXED AVATAR */}
            <div className="h-[90px] w-[90px] rounded-full overflow-hidden border-2 border-cyan-400/40 
                            ring-2 ring-cyan-400/20 shadow-[0_0_25px_rgba(34,211,238,0.25)]">
              {user?.image ? (
                <img
                  src={user.image}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center 
                                bg-gradient-to-br from-cyan-400 to-blue-500 
                                text-3xl font-bold text-white">
                  {initials}
                </div>
              )}
            </div>

            {/* USER INFO */}
            <div>
              <p className="text-xl font-semibold">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-300">
                {user?.email}
              </p>
              <p className="mt-1 text-xs text-cyan-300 uppercase tracking-wide">
                {user?.accountType}
              </p>
            </div>
          </div>

          <IconBtn
            text="Edit Profile"
            onClick={() => navigate('/dashboard/settings')}
          >
            <VscEdit />
          </IconBtn>
        </div>
      </div>

      {/* ABOUT */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
        <div className="mb-4 flex justify-between items-center">
          <p className="text-lg font-semibold text-cyan-300">About</p>
          <IconBtn
            outline
            text="Edit"
            onClick={() => navigate('/dashboard/settings')}
          >
            <VscEdit />
          </IconBtn>
        </div>
        <p className="text-sm text-richblack-300">
          {user?.additionalDetails?.about || 'Write about yourself'}
        </p>
      </div>

      {/* PERSONAL INFO */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
        <p className="mb-6 text-lg font-semibold text-cyan-300">
          Personal Information
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <Info label="First Name" value={user?.firstName} />
          <Info label="Last Name" value={user?.lastName} />
          <Info label="Email" value={user?.email} />
          <Info label="Phone" value={user?.additionalDetails?.contactNumber} />
          <Info label="Gender" value={user?.additionalDetails?.gender} />
          <Info
            label="Date of Birth"
            value={
              user?.additionalDetails?.dateOfBirth
                ? new Date(user.additionalDetails.dateOfBirth).toLocaleDateString("en-IN")
                : null
            }
          />

        </div>
      </div>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-richblack-400">{label}</p>
      <p className="font-medium">{value || '—'}</p>
    </div>
  )
}

export default MyProfile
