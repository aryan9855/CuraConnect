import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/healthProgramDetailsAPI";

import { setHealthProgram } from "../../../../../slices/healthProgramSlice";

import IconBtn from "../../../HomePage/common/IconBtn";

export default function SubSectionModal({
  modelData,
  setmodelData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { healthProgram } = useSelector((state) => state.healthProgram);

  const [loading, setLoading] = useState(false);

  // ============================
  // Prefill form for view/edit
  // ============================
  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modelData.title);
      setValue("lectureDesc", modelData.description);
      setValue("lectureVideo", modelData.videoUrl);
    }
  }, [view, edit, modelData, setValue]);

  // ============================
  // Detect form changes (edit mode)
  // ============================
  const isFormUpdated = () => {
    const currentValues = getValues();

    return (
      currentValues.lectureTitle !== modelData.title ||
      currentValues.lectureDesc !== modelData.description ||
      currentValues.lectureVideo !== modelData.videoUrl
    );
  };

  // ============================
  // Edit SubSection
  // ============================
  const handleEditSubSection = async () => {
    const currentValues = getValues();

    const formData = new FormData();
    formData.append("sectionId", modelData.sectionId);
    formData.append("subSectionId", modelData._id);

    if (currentValues.lectureTitle !== modelData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modelData.description) {
      formData.append("description", currentValues.lectureDesc);
    }

    if (currentValues.lectureVideo !== modelData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    setLoading(true);

    const result = await updateSubSection(formData, token);

    if (result) {
      dispatch(setHealthProgram(result));
    }

    setmodelData(null);
    setLoading(false);
  };

  // ============================
  // Submit Handler
  // ============================
  const onSubmit = async (data) => {
    if (view) return;

    // EDIT MODE
    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made");
        return;
      }

      await handleEditSubSection();
      return;
    }

    // ADD MODE
    const formData = new FormData();
    formData.append("sectionId", modelData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);

    if (data.lectureVideo && data.lectureVideo[0]) {
      formData.append("video", data.lectureVideo[0]);
    }

    setLoading(true);

    const result = await createSubSection(formData, token);

    if (result) {
      dispatch(setHealthProgram(result));
    }

    setmodelData(null);
    setLoading(false);
  };

  return (
  <div className="fixed inset-0 z-[1000] grid h-screen w-screen place-items-center bg-richblack-900/70 backdrop-blur-sm">

    <div className="w-11/12 max-w-[700px] rounded-xl border border-richblack-700 bg-richblack-800 shadow-xl">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-richblack-700 px-6 py-4">
        <p className="text-xl font-semibold text-richblack-5">
          {view && "Viewing"}
          {add && "Adding"}
          {edit && "Editing"} Lecture
        </p>

        <button
          onClick={() => (!loading ? setmodelData(null) : {})}
          className="text-richblack-300 hover:text-pink-200 transition"
        >
          <RxCross2 size={22} />
        </button>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 px-8 py-8"
      >

        {/* VIDEO */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-richblack-100">
            Lecture Video {!view && <sup className="text-pink-200">*</sup>}
          </label>

          {!view && (
            <input
              type="file"
              {...register("lectureVideo")}
              className="
                w-full text-sm text-richblack-200
                file:mr-4 file:rounded-md file:border-0
                file:bg-yellow-50 file:px-4 file:py-2
                file:text-sm file:font-semibold
                file:text-richblack-900
                hover:file:bg-yellow-100
              "
            />
          )}

          {(view || edit) && modelData.videoUrl && (
            <div className="mt-4 flex justify-center">
              <video
                src={modelData.videoUrl}
                controls
                className="
                  max-h-56
                  max-w-md
                  w-full
                  rounded-xl
                  object-contain
                  bg-black
                "
              />
            </div>
          )}
        </div>

        {/* TITLE */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-richblack-100">
            Lecture Title {!view && <sup className="text-pink-200">*</sup>}
          </label>

          <input
            disabled={view || loading}
            {...register("lectureTitle", { required: true })}
            placeholder="Enter Lecture Title"
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
              transition
            "
          />

          {errors.lectureTitle && (
            <p className="text-xs text-pink-200">
              Lecture title is required
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-richblack-100">
            Lecture Description {!view && <sup className="text-pink-200">*</sup>}
          </label>

          <textarea
            disabled={view || loading}
            {...register("lectureDesc", { required: true })}
            placeholder="Enter Lecture Description"
            className="
              min-h-[120px]
              w-full
              rounded-md
              border border-richblack-600
              bg-richblack-700
              px-4 py-2
              text-richblack-5
              placeholder:text-richblack-400
              focus:border-yellow-50
              focus:outline-none
              transition
            "
          />

          {errors.lectureDesc && (
            <p className="text-xs text-pink-200">
              Lecture description is required
            </p>
          )}
        </div>

        {!view && (
          <div className="flex justify-end">
            <IconBtn
              type="submit"
              disabled={loading}
              text={
                loading
                  ? "Saving..."
                  : edit
                  ? "Save Changes"
                  : "Save Lecture"
              }
              customClasses="px-6 py-2 rounded-md"
            />
          </div>
        )}

      </form>
    </div>
  </div>
)

}
