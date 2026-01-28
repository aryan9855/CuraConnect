import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // set cart count
    setTotalItems(state, action) {
      state.totalItems = action.payload;
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },

    // reset cart on logout
    resetCart(state) {
      state.totalItems = 0;
      localStorage.removeItem("totalItems");
    },
  },
});

export const { setTotalItems, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
