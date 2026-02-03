import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  const { editHealthProgram, healthProgram } = useSelector(
    (state) => state.healthProgram
  )

  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  useEffect(() => {
    if (editHealthProgram) {
      setRequirementsList(healthProgram?.criteria || [])
    }

    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, requirementsList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementsList])

  const handleAddRequirement = () => {
    if (requirement.trim()) {
      setRequirementsList([...requirementsList, requirement.trim()])
      setRequirement("")
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className="space-y-3">
      {/* Label */}
      <label className="text-sm font-medium text-richblack-100">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      {/* Input + Add */}
      <div className="flex gap-2">
        <input
          type="text"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          placeholder="e.g. Age above 18, No severe heart condition"
          className="flex-1 rounded-md border border-richblack-600 bg-richblack-700 px-4 py-2 text-richblack-5 focus:border-yellow-50 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleAddRequirement}
          className="rounded-md bg-yellow-50 px-4 py-2 text-sm font-semibold text-richblack-900 hover:bg-yellow-100"
        >
          Add
        </button>
      </div>

      {/* Requirement Pills */}
      {requirementsList.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {requirementsList.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-full bg-richblack-700 px-4 py-1 text-sm text-richblack-5"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirement(index)}
                className="text-xs text-pure-greys-300 hover:text-pink-200"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {errors[name] && (
        <p className="text-xs text-pink-200">
          {label} is required
        </p>
      )}
    </div>
  )
}
