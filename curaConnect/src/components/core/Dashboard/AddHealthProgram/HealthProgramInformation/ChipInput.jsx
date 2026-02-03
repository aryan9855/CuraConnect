import { useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const { editHealthProgram, healthProgram } = useSelector(
    (state) => state.healthProgram
  )

  const [chips, setChips] = useState([])

  useEffect(() => {
    if (editHealthProgram) {
      setChips(healthProgram?.tags || [])
    }

    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, chips)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chips])

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()

      const chipValue = event.target.value.trim()
      if (chipValue && !chips.includes(chipValue)) {
        setChips([...chips, chipValue])
        event.target.value = ""
      }
    }
  }

  const handleDeleteChip = (chipIndex) => {
    setChips(chips.filter((_, index) => index !== chipIndex))
  }

  return (
    <div className="space-y-3">
      {/* Label */}
      <label className="text-sm font-medium text-richblack-100">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      {/* Chip container */}
      <div className="flex flex-wrap gap-2 rounded-md border border-richblack-600 bg-richblack-700 p-3">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1 text-sm font-medium text-richblack-900"
          >
            {chip}
            <button
              type="button"
              onClick={() => handleDeleteChip(index)}
              className="text-richblack-600 hover:text-pink-200"
            >
              <MdClose size={14} />
            </button>
          </div>
        ))}

        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder || "Press Enter to add"}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-sm text-richblack-5 outline-none placeholder:text-richblack-400"
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
