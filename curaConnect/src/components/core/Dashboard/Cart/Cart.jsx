import React from "react";
import { useSelector } from "react-redux";
import RenderCartHealthProgram from "./RenderCartHealthProgram";
import RenderTotalAmount from "./RenderTotalAmount";

function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="min-h-screen text-white px-6 py-12">

      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-yellow-400">
            Your Cart
          </h1>
          <p className="mt-2 text-richblack-300 text-lg">
            {totalItems} {totalItems === 1 ? "Health Program" : "Health Programs"} in Cart
          </p>
        </div>

        {totalItems > 0 ? (
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Left Section - Cart Items */}
            <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <RenderCartHealthProgram />
            </div>

            {/* Right Section - Total */}
            <div className="w-full lg:w-[350px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl h-fit sticky top-24">
              <RenderTotalAmount />
            </div>

          </div>
        ) : (
          <div className="
            flex flex-col items-center justify-center
            bg-white/5 backdrop-blur-xl
            border border-white/10
            rounded-2xl
            p-12
            shadow-xl
            text-center
          ">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-semibold text-richblack-100 mb-2">
              Your Cart is Empty
            </h2>
            <p className="text-richblack-400">
              Browse health programs and start your healing journey today.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Cart;
