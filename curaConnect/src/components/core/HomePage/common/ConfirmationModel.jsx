import React from 'react'
import IconBtn from './IconBtn'

function ConfirmationModel({ modelData }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-richblack-900/70 backdrop-blur-sm">
      <div
        className="
          w-11/12 max-w-md
          rounded-xl
          bg-richblack-800/70
          backdrop-blur-xl
          border border-richblack-700
          shadow-[0_0_40px_rgba(34,211,238,0.25)]
          p-6
        "
      >
        <p className="text-xl font-semibold text-blue-400">
          {modelData?.text1}
        </p>

        <p className="mt-2 text-sm text-richblack-300">
          {modelData?.text2}
        </p>

        <div className="mt-6 flex justify-end gap-4">
          <IconBtn
            onClick={modelData?.btn1Handler}
            text={modelData?.btn1Text}
          />

          <button
            onClick={modelData?.btn2Handler}
            className="rounded-md px-4 py-2 text-sm font-medium text-richblack-200 hover:text-white hover:bg-richblack-700 transition-all"
          >
            {modelData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModel
