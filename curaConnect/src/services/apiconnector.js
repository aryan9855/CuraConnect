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
    throw error
  }
}
