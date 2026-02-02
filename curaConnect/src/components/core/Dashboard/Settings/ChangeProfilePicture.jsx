import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../HomePage/common/IconBtn"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => fileInputRef.current.click()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => setPreviewSource(reader.result)
  }

  const handleFileUpload = () => {
    if (!imageFile) return
    setLoading(true)
    const formData = new FormData()
    formData.append("displayPicture", imageFile)

    dispatch(updateDisplayPicture(token, formData)).finally(() =>
      setLoading(false)
    )
  }

  useEffect(() => {
    if (imageFile) previewFile(imageFile)
  }, [imageFile])

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-lg">
      <div className="flex items-center gap-6">
        <img
          src={previewSource || user?.image}
          alt="profile"
          className="h-20 w-20 rounded-full object-cover
                     border-2 border-cyan-400/40
                     shadow-[0_0_25px_rgba(34,211,238,0.35)]"
        />

        <div className="space-y-3">
          <p className="text-lg font-medium text-richblack-5">
            Change Profile Picture
          </p>

          <div className="flex gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/jpeg"
            />

            <button
              onClick={handleClick}
              disabled={loading}
              className="rounded-md border border-white/10 px-4 py-2 text-sm
                         text-richblack-50 hover:bg-white/10 transition"
            >
              Select
            </button>

            <IconBtn
              text={loading ? "Uploading..." : "Upload"}
              onClick={handleFileUpload}
            >
              {!loading && <FiUpload />}
            </IconBtn>
          </div>
        </div>
      </div>
    </div>
  )
}
