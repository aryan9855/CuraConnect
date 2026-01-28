export default function Tab({ tabData, field, setField }) {
  return (
    <div
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className="
        flex bg-richblack-800 p-1 gap-x-1 my-6
        rounded-full max-w-max
      "
    >
      {tabData.map((tab) => {
        const isActive = field === tab.type

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setField(tab.type)}
            className={`
              relative py-2 px-5 rounded-full
              text-sm font-medium
              transition-all duration-200 ease-out
              active:scale-[0.96]

              ${
                isActive
                  ? `
                    bg-richblack-900 text-richblack-5
                    shadow-sm
                    ring-1 ring-richblack-600
                  `
                  : `
                    bg-transparent text-richblack-300
                    hover:bg-richblack-700/60
                    hover:text-richblack-50
                  `
              }
            `}
          >
            {tab.tabName}
          </button>
        )
      })}
    </div>
  )
}
