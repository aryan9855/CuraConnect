import { useEffect, useState } from "react"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  editData = null,
  video = false, // 🔥 IMPORTANT
}) {
  const [preview, setPreview] = useState(editData || null)

  useEffect(() => {
    register(name, { required: !editData })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setValue(name, file)
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
    <div className="space-y-3">
      {/* Label */}
      <label className="text-sm font-medium text-richblack-100">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      {/* Upload Box */}
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-richblack-600 bg-richblack-700 p-6 text-center">

        {/* 🔥 VIDEO PREVIEW */}
        {preview && video && (
          <video
            src={preview}
            controls
            className="
              mb-4
              max-h-48
              w-full
              max-w-md
              rounded-lg
              object-contain
              shadow-md
            "
          />
        )}

        {/* IMAGE PREVIEW (if ever used for images) */}
        {preview && !video && (
          <img
            src={preview}
            alt="Preview"
            className="mb-4 max-h-40 rounded-md object-contain"
          />
        )}

        {!preview && (
          <p className="mb-3 text-sm text-richblack-300">
            Click to upload or drag & drop
          </p>
        )}

        <input
          type="file"
          accept={video ? "video/*" : "image/*"}  // 🔥 Important
          onChange={handleChange}
          className="w-full cursor-pointer text-sm text-richblack-200 file:mr-4 file:rounded-md file:border-0 file:bg-yellow-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-richblack-900 hover:file:bg-yellow-100"
        />
      </div>

      {/* Error */}
      {errors[name] && (
        <p className="text-xs text-pink-200">
          {label} is required
        </p>
      )}
    </div>
  )
}
