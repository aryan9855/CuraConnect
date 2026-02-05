import axios from "axios"

export const axiosInstance = axios.create({
  withCredentials: false,
})

export const apiConnector = (
  method,
  url,
  bodyData = undefined,
  headers = {},
  params = {},
  withCredentials = false
) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers,
    params,
    withCredentials,
  })
}
