import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { settingsEndpoints, profileEndpoints } from "../apis"
import { setUser } from "../../slices/profileSlice"
import { logout } from "./authAPI"

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingsEndpoints

const { GET_USER_DETAILS_API } = profileEndpoints

/* ============================================================
   🔁 REFETCH USER (SINGLE SOURCE OF TRUTH)
============================================================ */
export function getUserDetails(token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        "GET",
        GET_USER_DETAILS_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (!response?.data?.success) {
        throw new Error("Failed to fetch user details")
      }

      dispatch(setUser(response.data.data))
    } catch (error) {
      console.error("GET USER DETAILS ERROR:", error)
    
      if (error?.response?.status === 401) {
        // Token invalid or expired
        dispatch(logout())
      }
    }
    
  }
}

/* ============================================================
   🖼 UPDATE DISPLAY PICTURE
============================================================ */
export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating profile picture...")
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (!response?.data?.success) {
        throw new Error(response?.data?.message)
      }

      // ✅ Always refetch user
      await dispatch(getUserDetails(token))

      toast.success("Profile picture updated successfully")
    } catch (error) {
      console.error("UPDATE DISPLAY PICTURE ERROR:", error)
      toast.error("Could not update profile picture")
    }
    toast.dismiss(toastId)
  }
}

/* ============================================================
   ✏️ UPDATE PROFILE DETAILS
============================================================ */
export function updateProfile(token, data) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating profile...")
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_PROFILE_API,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (!response?.data?.success) {
        throw new Error(response?.data?.message)
      }

      // ✅ Always refetch user
      await dispatch(getUserDetails(token))

      toast.success("Profile updated successfully")
    } catch (error) {
      console.error("UPDATE PROFILE ERROR:", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}

/* ============================================================
   🔒 CHANGE PASSWORD
============================================================ */
export async function changePassword(token, data) {
  const toastId = toast.loading("Changing password...")
  try {
    const response = await apiConnector(
      "POST",
      CHANGE_PASSWORD_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    )

    if (!response?.data?.success) {
      throw new Error(response?.data?.message)
    }

    toast.success("Password changed successfully")
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error)
    toast.error(
      error?.response?.data?.message || "Could not change password"
    )
  }
  toast.dismiss(toastId)
}

/* ============================================================
   ❌ DELETE PROFILE
============================================================ */
export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting account...")
    try {
      const response = await apiConnector(
        "DELETE",
        DELETE_PROFILE_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      )

      if (!response?.data?.success) {
        throw new Error(response?.data?.message)
      }

      toast.success("Account deleted successfully")
      dispatch(logout(navigate))
    } catch (error) {
      console.error("DELETE PROFILE ERROR:", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}
