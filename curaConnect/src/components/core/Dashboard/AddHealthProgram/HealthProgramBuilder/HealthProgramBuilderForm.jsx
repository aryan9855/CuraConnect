import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { MdAddCircleOutline } from "react-icons/md"
import { BiRightArrow } from "react-icons/bi"
import { toast } from "react-hot-toast"

import IconBtn from "../../../HomePage/common/IconBtn"

import {
  setStep,
  setEditHealthProgram,
  setHealthProgram,
} from "../../../../../slices/healthProgramSlice"

import {
  createSection,
  updateSection,
} from "../../../../../services/operations/healthProgramDetailsAPI"

import NestedView from "./NestedView"

function HealthProgramBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { healthProgram } = useSelector((state) => state.healthProgram)
  const { token } = useSelector((state) => state.auth)

  const [editSectionName, setEditSectionName] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)

    let result = null

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          healthProgramId: healthProgram._id,
        },
        token
      )
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          healthProgramId: healthProgram._id,
        },
        token
      )
    }

    if (result) {
      dispatch(setHealthProgram(result))
      cancelEdit()
    }

    setLoading(false)
  }

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  const goToNext = () => {
    const sections = healthProgram?.healthProgramContent || []

    if (sections.length === 0) {
      toast.error("Please add atleast one section")
      return
    }

    if (
      sections.some(
        (section) =>
          !section.SubSection || section.SubSection.length === 0
      )
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }

    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditHealthProgram(true))
  }

  return (
    <div className="space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6">

      <p className="text-2xl font-semibold text-richblack-5">
        Health Program Builder
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5">
            Section Name <sup className="text-pink-200">*</sup>
          </label>

          <input
  disabled={loading}
  placeholder="Add a section"
  {...register("sectionName", { required: true })}
  className="
    w-full
    rounded-md
    border border-richblack-600
    bg-richblack-700
    px-4 py-2
    text-richblack-5
    placeholder:text-richblack-400
    focus:border-yellow-50
    focus:outline-none
    transition-all
  "
/>


          {errors.sectionName && (
            <span className="text-xs text-pink-200">
              Section name is required
            </span>
          )}
        </div>

        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <MdAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {healthProgram?.healthProgramContent?.length > 0 && (
        <NestedView
          handleChangeEditSectionName={handleChangeEditSectionName}
        />
      )}

      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className="rounded-md bg-richblack-300 px-6 py-2 font-semibold text-richblack-900"
        >
          Back
        </button>

        <IconBtn
          disabled={loading}
          text="Next"
          onClick={goToNext}
        >
          <BiRightArrow />
        </IconBtn>
      </div>
    </div>
  )
}

export default HealthProgramBuilderForm
