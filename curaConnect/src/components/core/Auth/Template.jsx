import { useSelector } from "react-redux"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center px-4">
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
        </div>
      ) : (
        <div
          className="mx-auto flex w-full max-w-6xl flex-col-reverse
                     items-center justify-between gap-y-16 py-12
                     md:flex-row md:gap-x-20"
        >
          {/* ================= FORM — GLASS ================= */}
          <div
            className="
              relative
              w-full max-w-[460px]
              rounded-2xl p-8
              bg-white/10
              backdrop-blur-sm
              border border-white/20
              shadow-lg
              overflow-hidden
            "
          >
            {/* subtle gradient overlay */}
            <div
              className="pointer-events-none absolute inset-0
                         bg-gradient-to-br from-cyan-400/10
                         via-blue-500/5 to-indigo-500/10"
            />

            <h1 className="relative text-3xl font-semibold text-white">
              {title}
            </h1>

            <p className="relative mt-4 text-base text-white">
              {description1}{" "}
              <span className="font-semibold italic text-cyan-300">
                {description2}
              </span>
            </p>

            <div className="relative">
              {formType === "signup" ? <SignupForm /> : <LoginForm />}
            </div>
          </div>

          {/* ================= IMAGE ================= */}
          {image && (
  <div className="relative mx-auto w-full max-w-[460px] md:mx-0 group">
    
    {/* outer gradient ring */}
    <div
      className="absolute inset-0 -z-20 rounded-3xl
                 bg-gradient-to-tr from-cyan-400
                 via-blue-500 to-indigo-500
                 opacity-30 blur-2xl"
    />

    {/* glow halo */}
    <div
      className="absolute inset-0 -z-10 rounded-2xl
                 bg-gradient-to-tr from-cyan-400/30
                 via-blue-500/20 to-indigo-500/30
                 blur-3xl"
    />

    {/* image wrapper for gradient border */}
    <div
      className="relative rounded-2xl p-[2px]
                 bg-gradient-to-tr from-cyan-400
                 via-blue-500 to-indigo-500"
    >
      <img
        src={image}
        alt="CuraConnect Healthcare"
        loading="lazy"
        className="relative w-full rounded-2xl
                   bg-richblack-900
                   shadow-2xl
                   transition-all duration-500
                   group-hover:scale-[1.03]
                   group-hover:shadow-blue-500/40"
      />

      {/* subtle image overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl
                   bg-gradient-to-tr from-white/10 via-transparent to-black/10"
      />
    </div>
  </div>
)}

        </div>
      )}
    </div>
  )
}

export default Template
