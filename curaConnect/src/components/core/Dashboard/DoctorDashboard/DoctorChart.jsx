import { useState, useMemo } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function DoctorChart({ data = [] }) {
  const [currentChart, setCurrentChart] = useState("patients")

  // Prevent crash if empty
  if (!data || data.length === 0) {
    return (
      <div className="h-60 flex items-center justify-center text-richblack-400">
        No data available
      </div>
    )
  }

  // Professional medical theme colors
  const generateColors = (length) => {
    const baseColors = [
      "#3B82F6", // blue
      "#22C55E", // green
      "#F59E0B", // amber
      "#EF4444", // red
      "#8B5CF6", // purple
      "#06B6D4", // cyan
    ]

    return Array.from({ length }, (_, i) => baseColors[i % baseColors.length])
  }

  const labels = useMemo(
    () =>
      data.map((item, index) =>
        item?.healthProgramName
          ? item.healthProgramName
          : `Program ${index + 1}`
      ),
    [data]
  )
  

  const patientsData = {
    labels,
    datasets: [
      {
        data: data.map((item) => item.totalPatientsEnrolled || 0),
        backgroundColor: generateColors(data.length),
        borderWidth: 1,
      },
    ],
  }

  const incomeData = {
    labels,
    datasets: [
      {
        data: data.map((item) => item.totalAmountGenerated || 0),
        backgroundColor: generateColors(data.length),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-xl h-full">

      {/* Title */}
      <h2 className="text-xl font-semibold text-white">
        Health Program Analytics
      </h2>

      {/* Toggle Buttons */}
      <div className="flex gap-4 font-semibold">
        <button
          onClick={() => setCurrentChart("patients")}
          className={`px-4 py-1 rounded-lg transition ${
            currentChart === "patients"
              ? "bg-blue-600 text-white"
              : "bg-richblack-700 text-blue-400 hover:bg-richblack-600"
          }`}
        >
          Patients
        </button>

        <button
          onClick={() => setCurrentChart("income")}
          className={`px-4 py-1 rounded-lg transition ${
            currentChart === "income"
              ? "bg-green-600 text-white"
              : "bg-richblack-700 text-green-400 hover:bg-richblack-600"
          }`}
        >
          Income
        </button>
      </div>

      {/* Chart */}
      <div className="relative mx-auto aspect-square w-full max-w-[400px]">
        <Pie
          data={currentChart === "patients" ? patientsData : incomeData}
          options={options}
        />
      </div>
    </div>
  )
}
