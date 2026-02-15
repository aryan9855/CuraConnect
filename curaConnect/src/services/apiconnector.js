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
  
    // 🔐 Auto logout on 401
    if (error?.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
  
    throw error
  }
  
}
