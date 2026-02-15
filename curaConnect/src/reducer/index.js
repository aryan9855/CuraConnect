import { combineReducers, createReducer } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";
import healthProgramReducer from "../slices/healthProgramSlice";
import profileReducer from "../slices/profileSlice";
import viewHealthProgramReducer from "../slices/viewHealthProgramSlice";


const rootReducer = combineReducers({
  auth: authReducer,
  profile:profileReducer,
  cart: cartReducer,
  healthProgram:healthProgramReducer,
  viewHealthProgram: viewHealthProgramReducer 
});

export default rootReducer;
