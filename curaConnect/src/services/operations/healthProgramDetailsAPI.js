import { toast } from "react-hot-toast"

import { updateCompletedLectures } from "../../slices/viewHealthProgramSlice"
import { apiConnector } from "../apiconnector"
import { healthProgramEndpoints, categoryEndpoints } from "../apis"

/* ===================== DESTRUCTURE ENDPOINTS ===================== */

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
} = healthProgramEndpoints

const { GET_ALL_CATEGORIES_API } = categoryEndpoints

/* ============================================================
   🌍 GET ALL HEALTH PROGRAMS
============================================================ */
export const getAllHealthPrograms = async () => {
  const toastId = toast.loading("Loading...")
  let result = []

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_HEALTHPROGRAMS_API
    )

    if (!response?.data?.success) {
      throw new Error("Could not fetch health programs")
    }

    result = response.data.data
  } catch (error) {
    console.error("GET_ALL_HEALTHPROGRAMS_API ERROR:", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}
/* ============================================================
   👨‍⚕️ GET ALL DOCTOR HEALTH PROGRAMS
============================================================ */
export const fetchDoctorHealthPrograms = async (token) => {
  let result = []
  const toastId = toast.loading("Loading...")

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_DOCTOR_HEALTHPROGRAMS_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    console.log("DOCTOR HEALTH PROGRAMS RESPONSE:", response)

    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Doctor Health Programs")
    }

    result = response?.data?.data

  } catch (error) {
    console.log("DOCTOR HEALTH PROGRAMS ERROR:", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}


/* ============================================================
   📄 GET HEALTH PROGRAM DETAILS
============================================================ */
export const fetchHealthProgramDetails = async (healthProgramId) => {
  const toastId = toast.loading("Loading...")
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      GET_HEALTHPROGRAM_DETAILS_API,
      { healthProgramId }
    )

    if (!response?.data?.success) {
      throw new Error(response.data.message)
    }

    result = response.data.data
  } catch (error) {
    console.error("GET_HEALTHPROGRAM_DETAILS_API ERROR:", error)
    result = error?.response?.data
  }

  toast.dismiss(toastId)
  return result
}

/* ============================================================
   🏷 GET HEALTH PROGRAM CATEGORIES (FIXED)
============================================================ */
export const fetchHealthProgramCategories = async () => {
  let result = []

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_CATEGORIES_API
    )

    if (response?.data?.success) {
      result = response.data.data
    } else {
      console.error("CATEGORY API FAILED:", response?.data)
    }
  } catch (error) {
    console.error("CATEGORY API ERROR:", error)
    toast.error("Could not fetch categories")
  }

  return result
}

/* ============================================================
   ➕ CREATE HEALTH PROGRAM
============================================================ */
export const addHealthProgramDetails = async (data, token) => {
  const toastId = toast.loading("Creating program...")
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      CREATE_HEALTHPROGRAM_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could not create health program")
    }

    toast.success("Health program created")
    result = response.data.data
  } catch (error) {
    console.error("CREATE_HEALTHPROGRAM_API ERROR:", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

/* ============================================================
   ✏️ EDIT HEALTH PROGRAM
============================================================ */
export const editHealthProgramDetails = async (data, token) => {
  const toastId = toast.loading("Updating program...")
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      EDIT_HEALTHPROGRAM_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response?.data?.success) {
      throw new Error("Could not update health program")
    }

    toast.success("Health program updated")
    result = response.data.data
  } catch (error) {
    console.error("EDIT_HEALTHPROGRAM_API ERROR:", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

// delete a HealthProgram
export const deleteHealthProgram = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_HEALTHPROGRAM_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE HEALTH PROGRAM API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Health Program")
    }
    toast.success("Health Program Deleted")
  } catch (error) {
    console.log("DELETE HEALTH PROGRAM API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}
/* ============================================================
   🧩 SECTIONS
============================================================ */
export const createSection = async (data, token) => {
  const toastId = toast.loading("Creating section...")
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      CREATE_SECTION_API,
      data,
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error("Could not create section")
    }

    toast.success("Section created")

    // 🔥 IMPORTANT FIX
    result = response.data.data

  } catch (error) {
    console.error("CREATE_SECTION_API ERROR:", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}


export const updateSection = async (data, token) => {
  const toastId = toast.loading("Updating section...")
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      UPDATE_SECTION_API,
      data,
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error("Could not update section")
    }

    toast.success("Section updated")

    result = response.data.data

  } catch (error) {
    console.error("UPDATE_SECTION_API ERROR:", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}


export const deleteSection = async (data, token) => {
  const toastId = toast.loading("Deleting section...")
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      DELETE_SECTION_API,
      data,
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error("Could not delete section")
    }

    toast.success("Section deleted")

    result = response.data.data

  } catch (error) {
    console.error("DELETE_SECTION_API ERROR:", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}


/* ============================================================
   🧩 SUBSECTIONS
============================================================ */
export const createSubSection = async (data, token) => {
  const toastId = toast.loading("Adding session...")
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      CREATE_SUBSECTION_API,
      data,
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error("Could not add session")
    }

    toast.success("Session added")
    result = response.data.data
  } catch (error) {
    console.error("CREATE_SUBSECTION_API ERROR:", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

export const updateSubSection = async (data, token) => {
  const toastId = toast.loading("Updating session...")
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      UPDATE_SUBSECTION_API,
      data,
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error("Could not update session")
    }

    toast.success("Session updated")
    result = response.data.data
  } catch (error) {
    console.error("UPDATE_SUBSECTION_API ERROR:", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

export const deleteSubSection = async (data, token) => {
  const toastId = toast.loading("Deleting session...")
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      DELETE_SUBSECTION_API,
      data,
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error("Could not delete session")
    }

    toast.success("Session deleted")
    result = response.data.data
  } catch (error) {
    console.error("DELETE_SUBSECTION_API ERROR:", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return result
}

/* ============================================================
   ⭐ CREATE RATING
============================================================ */
export const createRating = async (data, token) => {
  const toastId = toast.loading("Submitting review...")
  let success = false

  try {
    const response = await apiConnector(
      "POST",
      CREATE_RATING_API,
      data,
      { Authorization: `Bearer ${token}` }
    )

    if (!response?.data?.success) {
      throw new Error("Could not submit review")
    }

    toast.success("Review submitted")
    success = true
  } catch (error) {
    console.error("CREATE_RATING_API ERROR:", error)
    toast.error(error.message)
  }

  toast.dismiss(toastId)
  return success
}
