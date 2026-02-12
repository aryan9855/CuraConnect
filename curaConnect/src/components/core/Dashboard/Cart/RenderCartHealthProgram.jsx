import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../../slices/cartSlice";
import ReactStars from "react-rating-stars-component";

function RenderCartHealthProgram() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-6 w-[70%]">
      {cart.map((healthProgram) => (
        <div
          key={healthProgram._id}
          className="flex justify-between items-center bg-richblack-800 p-4 rounded-lg"
        >
          <div className="flex gap-4">
            <img
              src={healthProgram?.thumbnail}
              alt=""
              className="w-24 h-24 object-cover rounded"
            />

            <div>
              <p className="font-semibold">
                {healthProgram?.healthProgramName}
              </p>

              <p className="text-sm text-richblack-300">
                {healthProgram?.category?.name}
              </p>

              <div className="flex items-center gap-2 text-sm">
                <span>4.8</span>

                <ReactStars
                  count={5}
                  size={18}
                  edit={false}
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                />

                <span>
                  {healthProgram?.ratingAndReviews?.length || 0} Ratings
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <button
              onClick={() =>
                dispatch(removeFromCart(healthProgram._id))
              }
              className="flex items-center gap-2 text-red-400 hover:text-red-600 mb-2"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>

            <p className="font-bold">
              ₹ {healthProgram?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RenderCartHealthProgram;
