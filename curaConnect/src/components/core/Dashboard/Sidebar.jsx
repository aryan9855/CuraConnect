import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut, VscSettingsGear } from 'react-icons/vsc'
import ConfirmationModel from '../HomePage/common/ConfirmationModel'
import Loader from '../HomePage/common/Loader'

function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModel, setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) return <Loader />

  return (
    <aside
      className="
        relative
        sticky top-[3.5rem]
        h-[calc(100vh-3.5rem)]
        w-[240px]
        bg-richblack-900/75
        backdrop-blur-2xl
        border-r border-richblack-700/70
        shadow-[0_0_80px_rgba(34,211,238,0.25)]
        flex flex-col justify-between
      "
    >
      {/* Noise dampener */}
      <div className="absolute inset-0 bg-richblack-900/40" />

      {/* Glass reflection */}
      <div className="
        pointer-events-none absolute inset-0
        bg-gradient-to-b from-blue-500/10 via-transparent to-cyan-400/10
      " />

      {/* ===== LINKS ===== */}
      <div className="relative z-10 px-4 py-6 space-y-1">
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) return null
          return (
            <SidebarLink
              key={link.id}
              link={link}
              iconName={link.icon}
            />
          )
        })}
      </div>

      {/* Divider */}
      <div className="relative z-10 mx-auto my-4 h-px w-10/12
        bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* ===== BOTTOM ===== */}
      <div className="relative z-10 px-4 pb-6 space-y-2">
        <SidebarLink
          link={{ name: 'Settings', path: '/dashboard/settings' }}
          iconName="VscSettingsGear"
        />

        <button
          onClick={() =>
            setConfirmationModal({
              text1: 'Are you sure?',
              text2: 'You will be logged out of your account.',
              btn1Text: 'Logout',
              btn2Text: 'Cancel',
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          className="
            flex w-full items-center gap-x-3 rounded-md
            px-3 py-2 text-sm font-medium
            text-blue-300
            hover:bg-blue-500/10 hover:text-blue-400
            transition-all
          "
        >
          <VscSignOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>

      {confirmationModel && (
        <ConfirmationModel modelData={confirmationModel} />
      )}
    </aside>
  )
}

export default Sidebar
