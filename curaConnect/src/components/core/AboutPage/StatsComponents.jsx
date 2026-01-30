import React from "react"

const Stats = [
  { count: "5K+", label: "Active Patients" },
  { count: "120+", label: "Doctors" },
  { count: "200+", label: "Health Programs" },
  { count: "50+", label: "Awards" },
]

function StatsComponents() {
  return (
    <section className="w-full py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* Glass Container */}
        <div
          className="
            grid grid-cols-2 gap-6
            md:grid-cols-4
            rounded-2xl p-10
            bg-white/10 backdrop-blur-sm
            border border-white/20
            shadow-lg
          "
        >
          {Stats.map((data, index) => (
            <div
              key={index}
              className="
                flex flex-col items-center justify-center
                text-center
                rounded-xl p-6
                transition-all duration-300
                hover:scale-105 hover:bg-white/10
              "
            >
              {/* Count */}
              <h1 className="text-3xl md:text-4xl font-bold
                             bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500
                             bg-clip-text text-transparent">
                {data.count}
              </h1>

              {/* Label */}
              <p className="mt-2 text-sm md:text-base text-richblack-200 tracking-wide">
                {data.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default StatsComponents
