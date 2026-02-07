import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { VscSignOut, VscSettingsGear } from "react-icons/vsc"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import SidebarLink from "./SidebarLink"
import ConfirmationModel from "../HomePage/common/ConfirmationModel"
import Loader from "../HomePage/common/Loader"

function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModel, setConfirmationModel] = useState(null)

  if (profileLoading || authLoading) return <Loader />

  return (
    <aside
      className="
        fixed top-[3.5rem] left-0
        h-[calc(100vh-3.5rem)]
        w-[260px]
        bg-richblack-900/70
        backdrop-blur-xl
        border-r border-white/10
        flex flex-col
      "
    >
      {/* ===== TOP LINKS ===== */}
      <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
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

      {/* ===== BOTTOM ACTIONS ===== */}
      <div className="border-t border-white/10 px-4 py-4 space-y-2">
        {/* Settings */}
        <SidebarLink
          link={{ name: "Settings", path: "/dashboard/settings" }}
          iconName="VscSettingsGear"
        />

        {/* Logout */}
        <button
          onClick={() =>
            setConfirmationModel({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModel(null),
            })
          }
          className="
            flex w-full items-center gap-x-3 rounded-md
            px-3 py-2 text-sm font-medium
            text-red-400
            hover:bg-red-500/10 hover:text-red-300
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
