import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { healthProgramEndpoints, categoryEndpoints } from "../apis";

/* ===================== ENDPOINTS ===================== */

const {
  GET_ALL_HEALTHPROGRAMS_API,
  GET_HEALTHPROGRAM_DETAILS_API,
  GET_FULL_HEALTHPROGRAM_DETAILS_AUTHENTICATED_API,

  CREATE_HEALTHPROGRAM_API,
  EDIT_HEALTHPROGRAM_API,
  DELETE_HEALTHPROGRAM_API,

  CREATE_SECTION_API,
  UPDATE_SECTION_API,
  DELETE_SECTION_API,

  CREATE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SUBSECTION_API,

  GET_ALL_DOCTOR_HEALTHPROGRAMS_API,
  UPDATE_HEALTHPROGRAM_PROGRESS_API,

  CREATE_RATING_API,
} = healthProgramEndpoints;


const { GET_ALL_CATEGORIES_API } = categoryEndpoints;

/* ============================================================
   🌍 GET ALL HEALTH PROGRAMS
============================================================ */
export const getAllHealthPrograms = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_HEALTHPROGRAMS_API
    );

    if (!response?.data?.success) {
      throw new Error("Could not fetch health programs");
    }

    result = response.data.data;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ============================================================
   👨‍⚕️ GET DOCTOR HEALTH PROGRAMS
============================================================ */
export const fetchDoctorHealthPrograms = async (token) => {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_DOCTOR_HEALTHPROGRAMS_API,
      null,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Doctor Health Programs");
    }

    result = response.data.data;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ============================================================
   📄 GET HEALTH PROGRAM DETAILS (PUBLIC)
============================================================ */
export const fetchHealthProgramDetails = async (healthProgramId) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      GET_HEALTHPROGRAM_DETAILS_API,
      { healthProgramId }
    );

    if (!response?.data?.success) {
      throw new Error(response.data.message);
    }

    result = response.data.data;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ============================================================
   📄 GET FULL HEALTH PROGRAM DETAILS (AUTHENTICATED)
============================================================ */
export const fetchFullHealthProgramDetails = async (
  healthProgramId,
  token
) => {
  const toastId = toast.loading("Loading...");
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_HEALTHPROGRAM_DETAILS_AUTHENTICATED_API,
      { healthProgramId },
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    result = response.data.data;
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.message || error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ============================================================
   🏷 GET HEALTH PROGRAM CATEGORIES
============================================================ */
export const fetchHealthProgramCategories = async () => {
  let result = [];

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_CATEGORIES_API
    );

    if (response?.data?.success) {
      result = response.data.data;
    } else {
      throw new Error("Could not fetch categories");
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }

  return result;
};

/* ============================================================
   ➕ CREATE HEALTH PROGRAM
============================================================ */
export const addHealthProgramDetails = async (data, token) => {
  const toastId = toast.loading("Creating program...");
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      CREATE_HEALTHPROGRAM_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could not create health program");
    }

    toast.success("Health program created");
    result = response.data.data;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ============================================================
   ✏️ EDIT HEALTH PROGRAM
============================================================ */
export const editHealthProgramDetails = async (data, token) => {
  const toastId = toast.loading("Updating program...");
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      EDIT_HEALTHPROGRAM_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response?.data?.success) {
      throw new Error("Could not update health program");
    }

    toast.success("Health program updated");
    result = response.data.data;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};
/* ============================================================
   🧩 CREATE SECTION
============================================================ */
export const createSection = async (data, token) => {
  const toastId = toast.loading("Creating section...");
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      CREATE_SECTION_API,
      data,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error("Could not create section");
    }

    toast.success("Section created");
    result = response.data.data;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};
/* ============================================================
   ✏️ UPDATE SECTION
============================================================ */
export const updateSection = async (data, token) => {
  const toastId = toast.loading("Updating section...");
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      UPDATE_SECTION_API,
      data,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error("Could not update section");
    }

    toast.success("Section updated");
    result = response.data.data;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};
/* ============================================================
   ❌ DELETE SECTION
============================================================ */
export const deleteSection = async (data, token) => {
  const toastId = toast.loading("Deleting section...");
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      DELETE_SECTION_API,
      data,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error("Could not delete section");
    }

    toast.success("Section deleted");
    result = response.data.data;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ============================================================
   ❌ DELETE HEALTH PROGRAM
============================================================ */
export const deleteHealthProgram = async (data, token) => {
  const toastId = toast.loading("Deleting...");
  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_HEALTHPROGRAM_API,
      data,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error("Could not delete health program");
    }

    toast.success("Health Program Deleted");
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
};

/* ============================================================
   🧩 CREATE SUBSECTION
============================================================ */
export const createSubSection = async (data, token) => {
  const toastId = toast.loading("Adding session...");
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      CREATE_SUBSECTION_API,
      data,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error("Could not add session");
    }

    toast.success("Session added");
    result = response.data.data;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ============================================================
   ✏️ UPDATE SUBSECTION
============================================================ */
export const updateSubSection = async (data, token) => {
  const toastId = toast.loading("Updating session...");
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      UPDATE_SUBSECTION_API,
      data,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error("Could not update session");
    }

    toast.success("Session updated");
    result = response.data.data;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ============================================================
   ❌ DELETE SUBSECTION
============================================================ */
export const deleteSubSection = async (data, token) => {
  const toastId = toast.loading("Deleting session...");
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      DELETE_SUBSECTION_API,
      data,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error("Could not delete session");
    }

    toast.success("Session deleted");
    result = response.data.data;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};

/* ============================================================
   ✅ MARK LECTURE COMPLETE
============================================================ */
export const markLectureAsComplete = async (data, token) => {
  const toastId = toast.loading("Updating progress...");
  let result = null;

  try {
    const response = await apiConnector(
      "POST",
      UPDATE_HEALTHPROGRAM_PROGRESS_API,
      data,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error("Could not update lecture progress");
    }

    toast.success("Lecture marked as completed");
    result = response.data;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  return result;
};
