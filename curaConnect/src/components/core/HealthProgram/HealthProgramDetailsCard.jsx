import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../slices/cartSlice";

function HealthProgramDetailsCard({
  healthProgram,
  setConfirmationModel,
  handleBuyHealthProgram,
}) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!healthProgram) return null;

  const {
    _id,
    thumbnail,
    price,
    patientsEnrolled = [],
    instructions = [],
  } = healthProgram;

  const isEnrolled =
    user &&
    patientsEnrolled?.some(
      (id) => id.toString() === user?._id?.toString()
    );

  const isInCart =
    cart?.some(
      (item) => item._id?.toString() === _id?.toString()
    );

  const handleAddToCart = () => {
    if (!_id) return;

    if (!token) {
      setConfirmationModel({
        text1: "You are not logged in!",
        text2: "Please login to add this Health Program to cart.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModel(null),
      });
      return;
    }

    dispatch(addToCart(healthProgram));
  };

  return (
    <div className="bg-richblack-800 p-6 rounded-2xl shadow-xl w-full max-w-[420px]">

      <img
        src={thumbnail || "/default-thumbnail.jpg"}
        alt="Health Program Thumbnail"
        className="w-full rounded-xl object-cover mb-4"
      />

      <div className="text-2xl font-bold mb-4">
        ₹ {Number(price || 0)}
      </div>

      <div className="flex flex-col gap-3">

        {isEnrolled ? (
          <button
            onClick={() =>
              navigate("/dashboard/enrolled-health-programs")
            }
            className="bg-green-600 hover:bg-green-700 transition py-3 rounded-lg font-semibold"
          >
            Go to Health Program
          </button>
        ) : (
          <>
            <button
              onClick={handleBuyHealthProgram}
              className="bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold"
            >
              Buy Now
            </button>

            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              className={`py-3 rounded-lg font-semibold transition ${
                isInCart
                  ? "bg-richblack-600 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500 text-black"
              }`}
            >
              {isInCart ? "Already in Cart" : "Add To Cart"}
            </button>
          </>
        )}
      </div>

      <div className="mt-6 text-sm text-richblack-300 space-y-2">
        <p>✔ Lifetime access</p>
        <p>✔ Expert medical guidance</p>
        <p>✔ Certificate of completion</p>
      </div>

      {instructions?.length > 0 && (
        <div className="mt-6">
          <p className="font-semibold mb-3">
            This Health Program includes:
          </p>

          <div className="flex flex-col gap-y-2 text-sm text-richblack-300">
            {instructions.map((item, index) => (
              <p key={index} className="flex gap-2">
                <span className="text-green-400">•</span>
                {item}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthProgramDetailsCard;
