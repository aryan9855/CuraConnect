import React from "react";
import curaLogo from "../../../assets/Images/curaConnectLogo.png";

function ECGCard() {
  return (
    <div
      className="
        relative w-[420px] rounded-2xl p-6 text-white overflow-hidden
        bg-[radial-gradient(circle_at_top_left,#0ea5e933,transparent_40%),linear-gradient(180deg,#020617,#020617)]
        border border-white/10
        shadow-[0_40px_100px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(14,165,233,0.06)]
      "
    >
      {/* grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]
        bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)]
        bg-[size:24px_24px]" />

      {/* glow */}
      <div className="absolute -inset-[45%] bg-cyan-400/25 blur-[120px]" />

      {/* Header */}
      <div className="relative flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <img
            src={curaLogo}
            alt="CuraConnect Logo"
            className="w-10 h-10 rounded-3xl object-contain bg-white/10 p-1"
          />

          {/* Brand Name */}
          <span
            className="
              text-lg font-bold tracking-wide
              bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500
              text-transparent bg-clip-text
            "
          >
            CuraConnect
          </span>
        </div>

        <span className="text-xs text-green-400 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          Live Care
        </span>
      </div>

      {/* ECG Wave */}
      <svg className="relative w-full h-[60px] mb-6" viewBox="0 0 300 60">
        <path
          d="
            M0 30
            L30 30
            L45 10
            L60 50
            L75 30
            L95 30
            L110 12
            L125 48
            L140 30
            L160 30
            L175 6
            L195 58
            L220 30
            L240 30
          "
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="700"
          strokeDashoffset="700"
          className="animate-[ecg_3.5s_ease-in-out_infinite]"
        />
      </svg>

      {/* Metrics */}
      <div className="relative flex justify-between mb-4">
        <div>
          <p className="text-xs text-slate-400">Experts</p>
          <h4 className="text-lg font-semibold">120+</h4>
        </div>
        <div>
          <p className="text-xs text-slate-400">Videos</p>
          <h4 className="text-lg font-semibold">300+</h4>
        </div>
        <div>
          <p className="text-xs text-slate-400">Appointments</p>
          <h4 className="text-lg font-semibold">24/7</h4>
        </div>
      </div>

      {/* Tags */}
      <div className="relative flex flex-wrap gap-2">
        {["Health Info", "Expert Connect", "Care Videos", "Online & Offline"].map(
          (tag, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full
                         bg-white/10 backdrop-blur-md
                         border border-white/10"
            >
              {tag}
            </span>
          )
        )}
      </div>
    </div>
  );
}

export default ECGCard;
