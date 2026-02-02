import axios from "axios"

export const axiosInstance = axios.create({
  withCredentials: true,
})

export const apiConnector = (
  method,
  url,
  bodyData = undefined,
  headers = {},
  params = {}
) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers,
    params,
  })
}
