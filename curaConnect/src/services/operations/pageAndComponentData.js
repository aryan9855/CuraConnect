import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { catalogEndpoints } from "../apis"

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading catalog...")
  let result = null

  try {
    const response = await apiConnector(
      "POST",
      catalogEndpoints.GET_CATALOG_PAGE_DATA_API,
      { categoryId }
    )

    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could not fetch catalog"
      )
    }

    result = response.data.data

  } catch (error) {
    console.error("GET_CATALOG_PAGE_DATA_API ERROR:", error)

    toast.error(
      error?.message ||
      "Failed to load catalog"
    )
  }

  toast.dismiss(toastId)
  return result
}
