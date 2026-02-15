import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_HEALTHPROGRAMS_API,
  GET_DOCTOR_DASHBOARD_API,
} = profileEndpoints;


// ================= GET USER DETAILS =================
export async function getUserDetails(token) {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector(
      "GET",
      GET_USER_DETAILS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.data;

  } catch (error) {
    console.log("GET_USER_DETAILS ERROR:", error);
    toast.error("Could Not Get User Details");
  }

  toast.dismiss(toastId);
  return result;
}


// ================= GET ENROLLED HEALTH PROGRAMS =================
export async function getUserEnrolledHealthPrograms(token) {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_HEALTHPROGRAMS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.data;

  } catch (error) {
    console.log("GET ENROLLED HEALTH PROGRAMS ERROR:", error);
    toast.error("Could Not Get Enrolled Health Programs");
  }

  toast.dismiss(toastId);
  return result;
}


// ================= DOCTOR DASHBOARD =================
export async function getDoctorDashboard(token) {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      GET_DOCTOR_DASHBOARD_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    result = response?.data?.healthPrograms;

  } catch (error) {
    console.log("GET DOCTOR DASHBOARD ERROR:", error);
    toast.error("Could Not Get Dashboard Data");
  }

  toast.dismiss(toastId);
  return result;
}


import { healthProgramEndpoints } from "../apis";


const { CREATE_RATING_API } = healthProgramEndpoints;


export async function createRating(data, token) {
  const toastId = toast.loading("Submitting Review...");
  try {
    const response = await apiConnector(
      "POST",
      CREATE_RATING_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    toast.success("Review submitted successfully");
  } catch (error) {
    console.log("CREATE RATING ERROR:", error);
    toast.error("Could not submit review");
  }
  toast.dismiss(toastId);
}
