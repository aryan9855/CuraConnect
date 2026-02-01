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
      {/* ================= HEADER ================= */}
      <h1 className="text-3xl font-semibold text-blue-400">
        My Profile
      </h1>

      {/* ================= SECTION 1 : PROFILE CARD ================= */}
      <div className="flex flex-col gap-8 rounded-xl bg-richblack-800/70 backdrop-blur-xl border border-richblack-700/60 p-6 shadow-[0_0_40px_rgba(34,211,238,0.18)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            {user?.image ? (
              <img
                src={user.image}
                alt={`profile-${user.firstName}`}
                className="aspect-square w-[90px] rounded-full object-cover border-2 border-blue-400/50 shadow-[0_0_18px_rgba(34,211,238,0.35)]"
              />
            ) : (
              <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-3xl font-bold text-white shadow-[0_0_18px_rgba(34,211,238,0.45)]">
                {initials}
              </div>
            )}

            {/* Basic Info */}
            <div>
              <p className="text-xl font-semibold">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-300">
                {user?.email}
              </p>
              <p className="mt-1 text-xs text-blue-300 uppercase tracking-wide">
                {user?.accountType || 'User'}
              </p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <IconBtn
            text="Edit Profile"
            onClick={() => navigate('/dashboard/settings')}
          >
            <VscEdit />
          </IconBtn>
        </div>
      </div>

      {/* ================= SECTION 2 : ABOUT ================= */}
      <div className="rounded-xl bg-richblack-800/60 backdrop-blur-xl border border-richblack-700/60 p-6 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-lg font-semibold text-blue-300">
            About
          </p>

          <IconBtn
            text="Edit"
            outline
            onClick={() => navigate('/dashboard/settings')}
          >
            <VscEdit />
          </IconBtn>
        </div>

        <p className="text-sm text-richblack-300 leading-relaxed">
          {user?.additionalDetails?.about || 'Write about yourself'}
        </p>
      </div>

      {/* ================= SECTION 3 : PERSONAL INFO ================= */}
      <div className="rounded-xl bg-richblack-800/60 backdrop-blur-xl border border-richblack-700/60 p-6 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-lg font-semibold text-blue-300">
            Personal Information
          </p>

          <IconBtn
            text="Edit"
            outline
            onClick={() => navigate('/dashboard/settings')}
          >
            <VscEdit />
          </IconBtn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 text-sm">
          <Info label="First Name" value={user?.firstName} />
          <Info label="Last Name" value={user?.lastName} />
          <Info label="Email" value={user?.email} />
          <Info
            label="Phone"
            value={user?.additionalDetails?.contactNumber}
          />
          <Info
            label="Gender"
            value={user?.additionalDetails?.gender}
          />
          <Info
            label="Date of Birth"
            value={user?.additionalDetails?.dateOfBirth}
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
      <p className="font-medium text-richblack-5">
        {value || '—'}
      </p>
    </div>
  )
}

export default MyProfile
