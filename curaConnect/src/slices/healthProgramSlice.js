import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  healthProgram: null,
  editHealthProgram: false,
  paymentLoading: false,
}

const healthProgramSlice = createSlice({
  name: "healthProgram",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setHealthProgram: (state, action) => {
      state.healthProgram = action.payload
    },
    setEditHealthProgram: (state, action) => {
      state.editHealthProgram = action.payload   // ✅ FIX
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetHealthProgramState: (state) => {
      state.step = 1
      state.healthProgram = null
      state.editHealthProgram = false
    },
  },
})

export const {
  setStep,
  setHealthProgram,
  setEditHealthProgram,
  setPaymentLoading,
  resetHealthProgramState,
} = healthProgramSlice.actions

export default healthProgramSlice.reducer
