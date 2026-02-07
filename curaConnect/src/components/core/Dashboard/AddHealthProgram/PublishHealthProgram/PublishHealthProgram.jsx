import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"

import { HEALTHPROGRAM_STATUS } from "../../../../../utils/constants"
import { editHealthProgramDetails } from "../../../../../services/operations/healthProgramDetailsAPI"
import { setStep, resetHealthProgramState } from "../../../../../slices/healthProgramSlice"
import IconBtn from "../../../HomePage/common/IconBtn"

function PublishHealthProgram() {

  const { register, handleSubmit, setValue, getValues } = useForm()

  const { healthProgram } = useSelector((state) => state.healthProgram)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  // Prefill checkbox if already published
  useEffect(() => {
    if (healthProgram?.status === HEALTHPROGRAM_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [healthProgram, setValue])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToHealthPrograms = () => {
    dispatch(resetHealthProgramState())
  }

  const handleHealthProgramPublish = async () => {
    const isPublic = getValues("public")

    if (
      (healthProgram?.status === HEALTHPROGRAM_STATUS.PUBLISHED && isPublic) ||
      (healthProgram?.status === HEALTHPROGRAM_STATUS.DRAFT && !isPublic)
    ) {
      goToHealthPrograms()
      return
    }

    const formData = new FormData()
    formData.append("healthProgramId", healthProgram._id)

    const healthProgramStatus = isPublic
      ? HEALTHPROGRAM_STATUS.PUBLISHED
      : HEALTHPROGRAM_STATUS.DRAFT

    formData.append("status", healthProgramStatus)

    setLoading(true)
    const result = await editHealthProgramDetails(formData, token)
    setLoading(false)

    if (result) {
      goToHealthPrograms()
    }
  }

  const onSubmit = () => {
    handleHealthProgramPublish()
  }

  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-richblack-700 bg-richblack-800 p-8 shadow-lg">

      <p className="text-2xl font-semibold text-richblack-5 mb-6">
        Publish Health Program
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="h-4 w-4 rounded border-richblack-600 bg-richblack-700 text-yellow-50 focus:ring-yellow-50"
          />

          <label htmlFor="public" className="text-richblack-100">
            Make this Health Program Public
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">

          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="rounded-md bg-richblack-600 px-6 py-2 text-sm font-medium text-richblack-100 hover:bg-richblack-500 transition-all"
          >
            Back
          </button>

          <IconBtn
            disabled={loading}
            type="submit"
            text="Save Changes"
          />

        </div>

      </form>
    </div>
  )
}

export default PublishHealthProgram
