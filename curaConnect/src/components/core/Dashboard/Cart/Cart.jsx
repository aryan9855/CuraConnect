import React from "react";
import { useSelector } from "react-redux";
import RenderCartHealthProgram from "./RenderCartHealthProgram";
import RenderTotalAmount from "./RenderTotalAmount";

function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-2">Your Cart</h1>
      <p className="mb-6">
        {totalItems} Health Programs in Cart
      </p>

      {totalItems > 0 ? (
        <div className="flex gap-10">
          <RenderCartHealthProgram />
          <RenderTotalAmount />
        </div>
      ) : (
        <div>
          <p>Your Cart is Empty</p>
        </div>
      )}
    </div>
  );
}

export default Cart;
