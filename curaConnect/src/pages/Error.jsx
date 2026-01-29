import React from "react"
import { useNavigate } from "react-router-dom"

function Error() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-richblack-900 text-center px-4">
      <h1 className="text-7xl font-extrabold text-blue-400">404</h1>

      <p className="mt-4 text-2xl font-semibold text-richblack-5">
        Page Not Found
      </p>

      <p className="mt-2 max-w-md text-richblack-300">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-8 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500
                   px-6 py-3 font-semibold text-white
                   hover:from-blue-500 hover:to-cyan-400 transition-all"
      >
        Go Back Home
      </button>
    </div>
  )
}

export default Error
