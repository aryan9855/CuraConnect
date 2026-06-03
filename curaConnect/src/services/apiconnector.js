import axios from "axios"

export const apiConnector = async (
  method,
  url,
  bodyData = null,
  headers = {},
  params = null
) => {
  try {
    const response = await axios({
      method,
      url,
      data: bodyData,
      headers,
      params,
      withCredentials: true,
    })

    return response
  } catch (error) {
    console.error("API ERROR:", error?.response?.data || error.message)
  
    // 🔐 Auto logout on 401 (excluding public authentication endpoints)
    const isPublicAuthRoute = 
      typeof url === "string" && (
        url.includes("/auth/login") || 
        url.includes("/auth/signup") || 
        url.includes("/auth/sendotp") || 
        url.includes("/auth/reset-password")
      );

    if (error?.response?.status === 401 && !isPublicAuthRoute) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
  
    throw error
  }
  
}
