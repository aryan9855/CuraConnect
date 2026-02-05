import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../HomePage/common/IconBtn'
import { MdAddCircleOutline } from "react-icons/md"
import { BiRightArrow } from 'react-icons/bi'
import { toast } from 'react-hot-toast'

// IMPORT ACTIONS & APIs
import { setStep, setEditHealthProgram, setHealthProgram } from '../../../../../slices/healthProgramSlice'
import { createSection, updateSection } from "../../../../../services/operations/healthProgramDetailsAPI";
//import NestedView from './NestedView'

function HealthProgramBuilder() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [editSectionName, setEditSectionName] = useState(null)
  const { healthProgram } = useSelector((state) => state.healthProgram)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditHealthProgram(true))
  }

  const goToNext = () => {
    if (healthProgram.healthProgramContent.length === 0) {
      toast.error("Please add at least one section")
      return
    }

    if (
      healthProgram.healthProgramContent.some(
        (section) => section.subSection.length === 0
      )
    ) {
      toast.error("Please add at least one lecture in each section")
      return
    }

    dispatch(setStep(3))
  }

  const onSubmit = async (data) => {
    setLoading(true)
    let result

    if (editSectionName) {
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        healthProgramId: healthProgram._id,
      }, token)
    } else {
      result = await createSection({
        sectionName: data.sectionName,
        healthProgramId: healthProgram._id,
      }, token)
    }

    if (result) {
      dispatch(setHealthProgram(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }

    setLoading(false)
  }

  return (
    <div className="text-white">
      <p className="text-lg font-semibold">Health Program Builder</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="sectionName">
            Section name <sup>*</sup>
          </label>

          <input
            id="sectionName"
            placeholder="Add Section Name"
            {...register("sectionName", { required: true })}
            className="w-full text-black"
          />

          {errors.sectionName && (
            <span>Section Name is required</span>
          )}
        </div>

        <div className="mt-10 flex w-full gap-x-3">
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline
            customClasses="text-white"
            disabled={loading}
          >
            <MdAddCircleOutline />
          </IconBtn>

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-white underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* {healthProgram.healthProgramContent.length > 0 && (
        <NestedView />
      )} */}

      <div className="flex justify-center gap-x-3 mt-10">
        <button
          onClick={goBack}
          className="rounded-md cursor-pointer flex items-center"
        >
          Back
        </button>

        <IconBtn text="Next" onClick={goToNext}>
          <BiRightArrow />
        </IconBtn>
      </div>
    </div>
  )
}

export default HealthProgramBuilder
