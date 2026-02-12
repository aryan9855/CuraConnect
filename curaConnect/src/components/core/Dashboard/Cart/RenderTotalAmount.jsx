import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../HomePage/common/IconBtn";
import { buyHealthProgram } from "../../../../services/operations/patientFeaturesAPI";
import { resetCart } from "../../../../slices/cartSlice";

function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBuyHealthProgram = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (!cart.length) return;

    const healthProgramIds = cart.map(
      (healthProgram) => healthProgram._id
    );

    // Call payment API
    await buyHealthProgram(
      token,
      healthProgramIds,
      user,
      navigate,
      dispatch
    );

    // Clear cart after successful payment
    dispatch(resetCart());
  };

  return (
    <div className="bg-richblack-800 p-6 rounded-xl w-[300px] h-fit">
      <p className="text-lg font-semibold mb-2">Total:</p>

      <p className="text-2xl font-bold mb-6">
        ₹ {total}
      </p>

      <IconBtn
        text="Buy Now"
        onClick={handleBuyHealthProgram}
        customClasses="w-full justify-center bg-blue-600 hover:bg-blue-700"
      />
    </div>
  );
}

export default RenderTotalAmount;
