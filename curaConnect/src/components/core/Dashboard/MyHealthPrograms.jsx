import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import HealthProgramsTable from "./DoctorHealthPrograms/HealthProgramsTable"
import { fetchDoctorHealthPrograms } from "../../../services/operations/healthProgramDetailsAPI"
import IconBtn from "../HomePage/common/IconBtn"

function MyHealthPrograms() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [healthPrograms, setHealthPrograms] = useState([])

  useEffect(() => {
    const fetchHealthPrograms = async () => {
      const result = await fetchDoctorHealthPrograms(token)
      if (result) {
        setHealthPrograms(result)
      }
    }

    fetchHealthPrograms()
  }, [token])

  return (
    <div className="text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Health Programs</h1>

        <IconBtn
          text="Add Health Program"
          onClick={() => navigate("/dashboard/add-health-programs")}
        />
      </div>

      <HealthProgramsTable
        healthPrograms={healthPrograms}
        setHealthPrograms={setHealthPrograms}
      />
    </div>
  )
}

export default MyHealthPrograms
