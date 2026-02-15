import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

import IconBtn from "../HomePage/common/IconBtn";
import { createRating } from "../../../services/operations/profileAPI";

function HealthProgramReviewModel({ setReviewModel }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { healthProgramEntireData } = useSelector(
    (state) => state.viewHealthProgram
  );
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    register("healthProgramRating", { required: true });
  }, [register]);
  

  useEffect(() => {
    setValue("healthProgramExperience", "");
    setValue("healthProgramRating", 0);
  }, [setValue]);

  const ratingChanged = (newRating) => {
    setValue("healthProgramRating", newRating);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        healthProgramId: healthProgramEntireData?._id,
        rating: data.healthProgramRating,
        review: data.healthProgramExperience,
      },
      token
    );

    setReviewModel(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-richblack-800 text-white p-6 rounded-xl w-[420px] shadow-2xl border border-richblack-600">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-xl font-semibold">Add Review</p>
          <button
            onClick={() => setReviewModel(false)}
            className="text-richblack-300 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src={user?.image}
            alt="user"
            className="w-12 h-12 rounded-full border-2 border-yellow-400"
          />
          <div>
            <p className="font-semibold">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">Posting Publicly</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* ⭐ Stars Section */}
          <div className="mb-6">
  <p className="mb-3 text-sm text-richblack-200">
    Rate this Health Program
  </p>

  <div className="flex justify-center gap-2 text-3xl">
    {[1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        onClick={() => {
          setRating(star);
          setValue("healthProgramRating", star);
        }}
        className={`cursor-pointer transition ${
          star <= rating
            ? "text-yellow-400"
            : "text-richblack-600"
        }`}
      />
    ))}
  </div>
</div>


          {/* Review Textarea */}
          <div>
            <label className="text-sm text-richblack-200">
              Add Your Experience
            </label>

            <textarea
              placeholder="Share your experience..."
              {...register("healthProgramExperience", { required: true })}
              className="w-full mt-2 p-3 rounded-lg bg-richblack-700 border border-richblack-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-white"
              rows={4}
            />

            {errors.healthProgramExperience && (
              <span className="text-red-400 text-sm">
                Please add your experience
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setReviewModel(false)}
              className="px-4 py-2 bg-richblack-600 rounded-md hover:bg-richblack-500 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-300 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HealthProgramReviewModel;
