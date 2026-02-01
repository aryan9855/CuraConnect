import React from 'react'
import * as Icons from 'react-icons/vsc'
import { NavLink } from 'react-router-dom'

function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]

  return (
    <NavLink
      to={link.path}
      className={({ isActive }) =>
        `
        relative flex items-center gap-x-3 rounded-md
        px-3 py-2 text-sm font-medium transition-all
        ${
          isActive
            ? 'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 text-blue-300'
            : 'text-richblack-300 hover:bg-richblack-800 hover:text-blue-200'
        }
        `
      }
    >
      {/* Active indicator */}
      <span
        className={`
          absolute left-0 top-0 h-full w-[3px] rounded-r
          ${
            window.location.pathname === link.path
              ? 'bg-gradient-to-b from-cyan-400 to-blue-500'
              : 'opacity-0'
          }
        `}
      />

      {Icon && <Icon className="text-lg" />}
      <span>{link.name}</span>
    </NavLink>
  )
}

export default SidebarLink
