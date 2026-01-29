import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { resetCart } from "../../slices/cartSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"

console.log("ENV:", import.meta.env);
console.log("BASE:", import.meta.env.VITE_BASE_URL);

const {
  SEND_OTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESET_PASSWORD_TOKEN_API,
  RESET_PASSWORD_API,
} = endpoints

/* ===================== SEND OTP ===================== */
export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending verification code...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })

      if (!response?.data?.success) {
        throw new Error(response?.data?.message)
      }

      toast.success("Verification code sent to your email")
      navigate("/verify-email")
    } catch (error) {
      console.error("SEND OTP ERROR:", error)
      toast.error(error?.response?.data?.message || "Unable to send OTP")
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

/* ===================== SIGNUP ===================== */
export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Creating your account...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      if (!response?.data?.success) {
        throw new Error(response?.data?.message)
      }

      toast.success("Account created successfully")
      navigate("/login")
    } catch (error) {
      console.error("SIGNUP ERROR:", error)
      toast.error(error?.response?.data?.message || "Signup failed")
      navigate("/signup")
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

/* ===================== LOGIN ===================== */
export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Signing you in...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      if (!response?.data?.success) {
        throw new Error(response?.data?.message)
      }

      const { user, token } = response.data

      const userImage = user?.image
        ? user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`

      const normalizedUser = { ...user, image: userImage }

      dispatch(setToken(token))
      dispatch(setUser(normalizedUser))

      localStorage.setItem("token", JSON.stringify(token))
      localStorage.setItem("user", JSON.stringify(normalizedUser))

      toast.success("Login successful")

      // Role-based redirect
      if (user.accountType === "Doctor") {
        navigate("/dashboard/doctor")
      } else {
        navigate("/dashboard/my-profile")
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error)
      toast.error(error?.response?.data?.message || "Invalid email or password")
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

/* ===================== LOGOUT ===================== */
export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    toast.success("You have been logged out")
    navigate("/")
  }
}

// RESET PASSWORD TOKEN
export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector(
        "POST",
        RESET_PASSWORD_TOKEN_API,
        { email }
      )

      if (!response?.data?.success) {
        throw new Error(response?.data?.message)
      }

      toast.success("Password reset email sent")
      setEmailSent(true)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to send reset email")
    } finally {
      dispatch(setLoading(false))
    }
  }
}


// RESET PASSWORD
export function resetPassword(password, confirmPassword, token) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector(
        "POST",
        RESET_PASSWORD_API,
        { password, confirmPassword, token }
      )

      if (!response?.data?.success) {
        throw new Error(response?.data?.message)
      }

      toast.success("Password reset successful")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Reset failed")
    } finally {
      dispatch(setLoading(false))
    }
  }
}

