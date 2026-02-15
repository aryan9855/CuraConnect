import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import IconBtn from "../HomePage/common/IconBtn";
import { createRating } from "../../../services/operations/profileAPI";

function HealthProgramReviewModel({ setReviewModel }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { healthProgramEntireData } = useSelector(
    (state) => state.viewHealthProgram
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("healthProgramExperience", "");
    setValue("healthProgramRating", 0);
  }, [setValue]);

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

  const ratingChanged = (newRating) => {
    setValue("healthProgramRating", newRating);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">Add Review</p>
          <button onClick={() => setReviewModel(false)}>Close</button>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <img
            src={user?.image}
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p>{user?.firstName} {user?.lastName}</p>
            <p className="text-sm text-gray-500">Posting Publicly</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffc700"
          />

          <div className="mt-4">
            <label htmlFor="healthProgramExperience">
              Add Your Experience
            </label>

            <textarea
              id="healthProgramExperience"
              placeholder="Add your experience here"
              {...register("healthProgramExperience", { required: true })}
              className="form-style w-full mt-2"
            />

            {errors.healthProgramExperience && (
              <span className="text-red-500 text-sm">
                Please add your experience
              </span>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setReviewModel(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <IconBtn text="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default HealthProgramReviewModel;
