import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  healthProgramSectionData: [],
  healthProgramEntireData: null,
  completedLectures: [],
  totalNoOfLectures: 0,
}

const viewHealthProgramSlice = createSlice({
  name: "viewHealthProgram",
  initialState,
  reducers: {
    setHealthProgramSectionData: (state, action) => {
      state.healthProgramSectionData = action.payload
    },
    setEntireHealthProgramData: (state, action) => {
      state.healthProgramEntireData = action.payload
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload
    },
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload]
    },
  },
})

export const {
  setHealthProgramSectionData,
  setEntireHealthProgramData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = viewHealthProgramSlice.actions

export default viewHealthProgramSlice.reducer