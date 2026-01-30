import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  loading: false,
  signupData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSignupData(state, action) {
      state.signupData = {
        ...state.signupData,   // 🔥 PRESERVE EXISTING DATA
        ...action.payload,     // 🔥 ADD / UPDATE NEW DATA
      };
    },
  },
});

export const { setToken, setLoading, setSignupData } = authSlice.actions;
export default authSlice.reducer;
