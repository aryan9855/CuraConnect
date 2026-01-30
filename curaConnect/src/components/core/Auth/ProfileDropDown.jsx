import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../../../services/operations/authAPI"
import { useState, useRef, useEffect } from "react"

function ProfileDropDown() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  // close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Image */}
      <img
        src={user.image}
        alt="profile"
        onClick={() => setOpen((prev) => !prev)}
        className="h-10 w-10 rounded-full cursor-pointer
                   border-2 border-blue-400
                   hover:scale-105 transition-all"
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-44 rounded-xl
                        bg-richblack-800 border border-richblack-700
                        shadow-xl overflow-hidden">

          <Link
            to="/dashboard/my-profile"
            className="block px-4 py-2 text-sm text-richblack-100
                       hover:bg-richblack-700 transition"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>

          <button
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="w-full text-left px-4 py-2 text-sm
                       text-pink-300 hover:bg-richblack-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileDropDown
