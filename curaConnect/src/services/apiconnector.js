import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // IMPORTANT
})

export const apiConnector = async (
  method,
  url,
  bodyData = null,
  headers = {},
  params = null
) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData,
      headers,
      params,
    })

    return response
  } catch (error) {
    console.error("API ERROR:", error?.response?.data || error.message)
    return error?.response
  }
}
