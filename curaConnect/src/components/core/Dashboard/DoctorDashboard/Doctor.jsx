import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchDoctorHealthPrograms } from "../../../../services/operations/healthProgramDetailsAPI"
import { getDoctorDashboard } from "../../../../services/operations/profileAPI"
import DoctorChart from "./DoctorChart"
import Loader from "../../HomePage/common/Loader"

export default function Doctor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const [loading, setLoading] = useState(false)
  const [doctorData, setDoctorData] = useState([])
  const [healthPrograms, setHealthPrograms] = useState([])

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const dashboardData = await getDoctorDashboard(token)
        const programs = await fetchDoctorHealthPrograms(token)

        if (dashboardData) setDoctorData(dashboardData)
        if (programs) setHealthPrograms(programs)
      } catch (error) {
        console.log("Doctor Dashboard Error:", error)
      }

      setLoading(false)
    }

    if (token) fetchData()
  }, [token])

  // ================= CALCULATIONS =================
  const totalIncome =
    doctorData?.reduce(
      (acc, curr) => acc + (curr.totalAmountGenerated || 0),
      0
    ) || 0

  const totalPatients =
    doctorData?.reduce(
      (acc, curr) => acc + (curr.totalPatientsEnrolled || 0),
      0
    ) || 0

  // ================= UI =================
  return (
    <div className="min-h-screen text-white px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white">
          Hi {user?.firstName} 👋
        </h1>
        <p className="text-richblack-300 mt-2">
          Welcome back to your CuraConnect dashboard
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Loader />
        </div>
      ) : healthPrograms.length > 0 ? (
        <div className="space-y-10">
          
          {/* ================= STATS + CHART ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Chart */}
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-semibold mb-4">
                Performance Overview
              </h2>

              {totalIncome > 0 || totalPatients > 0 ? (
                <DoctorChart data={doctorData} />
              ) : (
                <div className="h-60 flex items-center justify-center text-richblack-400">
                  Not enough data to visualize yet
                </div>
              )}
            </div>

            {/* Statistics Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
              <h2 className="text-xl font-semibold">Statistics</h2>

              <div>
                <p className="text-richblack-400">Total Health Programs</p>
                <p className="text-3xl font-bold text-yellow-400">
                  {healthPrograms.length}
                </p>
              </div>

              <div>
                <p className="text-richblack-400">Total Patients</p>
                <p className="text-3xl font-bold text-green-400">
                  {totalPatients}
                </p>
              </div>

              <div>
                <p className="text-richblack-400">Total Income</p>
                <p className="text-3xl font-bold text-blue-400">
                  ₹ {totalIncome}
                </p>
              </div>
            </div>
          </div>

          {/* ================= HEALTH PROGRAMS PREVIEW ================= */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Your Health Programs
              </h2>

              <Link to="/dashboard/my-health-programs">
                <span className="text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition">
                  View All
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {healthPrograms.slice(0, 3).map((program) => (
                <div
                  key={program._id}
                  className="bg-richblack-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={program.thumbnail}
                    alt={program.healthProgramName}
                    className="h-[180px] w-full object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-semibold text-lg line-clamp-1">
                      {program.healthProgramName}
                    </h3>

                    <div className="mt-2 text-sm text-richblack-300 flex justify-between">
                      <span>
                        {program.patientsEnrolled?.length || 0} patients
                      </span>

                      <span className="text-yellow-400 font-semibold">
                        ₹ {program.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* ================= EMPTY STATE ================= */
        <div className="mt-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 text-center shadow-xl">
          <p className="text-2xl font-bold text-white">
            You have not created any Health Programs yet
          </p>

          <Link to="/dashboard/add-health-programs">
            <p className="mt-4 text-lg font-semibold text-yellow-400 hover:text-yellow-300 transition">
              Create a Health Program
            </p>
          </Link>
        </div>
      )}
    </div>
  )
}

