import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import RenderSteps from "../AddHealthProgram/RenderSteps"
import Loader from "../../HomePage/common/Loader"

import { fetchFullHealthProgramDetails } from "../../../../services/operations/healthProgramDetailsAPI"
import {
  setEditHealthProgram,
  setHealthProgram,
} from "../../../../slices/healthProgramSlice"

function EditHealthProgram() {
  const dispatch = useDispatch()
  const { healthProgramId } = useParams()

  const { healthProgram } = useSelector((state) => state.healthProgram)
  const { token } = useSelector((state) => state.auth)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const populateHealthProgramDetails = async () => {
      setLoading(true)

      try {
        const result = await fetchFullHealthProgramDetails(
          healthProgramId,
          token
        )

        const healthProgramDetails = result?.healthProgram

        if (healthProgramDetails) {
          dispatch(setEditHealthProgram(true))
          dispatch(setHealthProgram(healthProgramDetails))
        } else {
          dispatch(setHealthProgram(null))
        }
      } catch (error) {
        console.error("Error fetching health program details:", error)
      }

      setLoading(false)
    }

    if (healthProgramId && token) {
      populateHealthProgramDetails()
    }
  }, [healthProgramId, token, dispatch])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Edit Health Program
      </h1>

      {healthProgram ? (
        <RenderSteps />
      ) : (
        <p className="text-center text-lg">
          Health Program Not Found
        </p>
      )}
    </div>
  )
}

export default EditHealthProgram
