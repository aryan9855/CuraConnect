import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addHealthProgramDetails,
  editHealthProgramDetails,
  fetchHealthProgramCategories,
} from "../../../../../services/operations/healthProgramDetailsAPI"

import { setHealthProgram, setStep } from "../../../../../slices/healthProgramSlice"
import { HEALTHPROGRAM_STATUS } from "../../../../../utils/constants"

import IconBtn from "../../../../core/HomePage/common/IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"

export default function HealthProgramInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { healthProgram, editHealthProgram } = useSelector(
    (state) => state.healthProgram
  )

  const [loading, setLoading] = useState(false)
  const [medicalCategories, setMedicalCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchHealthProgramCategories()
      if (categories?.length > 0) setMedicalCategories(categories)
      setLoading(false)
    }

    if (editHealthProgram) {
      setValue("programTitle", healthProgram.healthProgramName)
      setValue("programShortDesc", healthProgram.healthProgramDescription)
      setValue("consultationFee", healthProgram.price)
      setValue("programTags", healthProgram.tag)
      setValue("healthBenefits", healthProgram.whatYouWillLearn)
      setValue("medicalCategory", healthProgram.category)
      setValue("eligibilityCriteria", healthProgram.instructions)
      setValue("programImage", healthProgram.thumbnail)
    }

    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (data) => {
    if (editHealthProgram) {
      const formData = new FormData()
      formData.append("healthProgramId", healthProgram._id)
      formData.append("healthProgramName", data.programTitle)
      formData.append("healthProgramDescription", data.programShortDesc)
      formData.append("price", data.consultationFee)
      formData.append("tag", JSON.stringify(data.programTags))
      formData.append("whatYouWillLearn", data.healthBenefits)
      formData.append("category", data.medicalCategory)
      formData.append("instructions", JSON.stringify(data.eligibilityCriteria))
      if (data.programImage)
        formData.append("thumbnailImage", data.programImage)

      setLoading(true)
      const result = await editHealthProgramDetails(formData, token)
      setLoading(false)

      if (result) {
        dispatch(setHealthProgram(result))
        dispatch(setStep(2))
      }
      return
    }

    const formData = new FormData()
    formData.append("healthProgramName", data.programTitle)
    formData.append("healthProgramDescription", data.programShortDesc)
    formData.append("price", data.consultationFee)
    formData.append("tag", JSON.stringify(data.programTags))
    formData.append("whatYouWillLearn", data.healthBenefits)
    formData.append("category", data.medicalCategory)
    formData.append("instructions", JSON.stringify(data.eligibilityCriteria))
    formData.append("status", HEALTHPROGRAM_STATUS.DRAFT)
    formData.append("thumbnailImage", data.programImage)

    setLoading(true)
    const result = await addHealthProgramDetails(formData, token)
    setLoading(false)

    if (result) {
      dispatch(setHealthProgram(result))
      dispatch(setStep(2))
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-4xl space-y-8 rounded-xl border border-richblack-700 bg-richblack-800 p-8 shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-richblack-5">
        Health Program Information
      </h2>

      {/* Program Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-richblack-100">
          Program Title
        </label>
        <input
          {...register("programTitle", { required: true })}
          placeholder="e.g. Diabetes Care Program"
          className="w-full rounded-md border border-richblack-600 bg-richblack-700 px-4 py-2 text-richblack-5 focus:border-yellow-50 focus:outline-none"
        />
        {errors.programTitle && (
          <p className="text-xs text-pink-200">Program title is required</p>
        )}
      </div>

      {/* Program Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-richblack-100">
          Program Description
        </label>
        <textarea
          {...register("programShortDesc", { required: true })}
          className="min-h-[120px] w-full rounded-md border border-richblack-600 bg-richblack-700 px-4 py-2 text-richblack-5 focus:border-yellow-50 focus:outline-none"
        />
      </div>

      {/* Fee */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-richblack-100">
          Consultation Fee
        </label>
        <div className="relative">
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-richblack-300" />
          <input
            {...register("consultationFee", { required: true })}
            className="w-full rounded-md border border-richblack-600 bg-richblack-700 py-2 pl-10 pr-4 text-richblack-5 focus:border-yellow-50 focus:outline-none"
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-richblack-100">
          Medical Category
        </label>
        <select
          {...register("medicalCategory", { required: true })}
          className="w-full rounded-md border border-richblack-600 bg-richblack-700 px-4 py-2 text-richblack-5 focus:border-yellow-50 focus:outline-none"
        >
          <option value="">Select category</option>
          {medicalCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <ChipInput
        label="Medical Tags"
        name="programTags"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
      />

      <Upload
        name="programImage"
        label="Program Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editHealthProgram ? healthProgram.thumbnail : null}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium text-richblack-100">
          Health Benefits
        </label>
        <textarea
          {...register("healthBenefits", { required: true })}
          className="min-h-[120px] w-full rounded-md border border-richblack-600 bg-richblack-700 px-4 py-2 text-richblack-5 focus:border-yellow-50 focus:outline-none"
        />
      </div>

      <RequirementsField
        name="eligibilityCriteria"
        label="Eligibility Criteria"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
      />

      <div className="flex justify-end gap-3 pt-4">
        {editHealthProgram && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="rounded-md bg-richblack-600 px-6 py-2 text-sm font-medium text-richblack-100 hover:bg-richblack-500"
          >
            Skip Saving
          </button>
        )}
        <IconBtn
        type="submit"
          disabled={loading}
          text={editHealthProgram ? "Save Changes" : "Next"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}
