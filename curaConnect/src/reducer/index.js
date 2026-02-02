import { combineReducers, createReducer } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";
import healthProgramReducer from "../slices/healthProgramSlice";
import profileReducer from "../slices/profileSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile:profileReducer,
  cart: cartReducer,
  healthProgram:healthProgramReducer
});

export default rootReducer;
