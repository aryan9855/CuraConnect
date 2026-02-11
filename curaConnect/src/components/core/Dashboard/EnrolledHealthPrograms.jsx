import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../HomePage/common/Loader";
import { getUserEnrolledHealthPrograms } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";

function EnrolledHealthPrograms() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledHealthPrograms, setEnrolledHealthPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEnrolledHealthProgram = async () => {
    try {
      const response = await getUserEnrolledHealthPrograms(token);
      setEnrolledHealthPrograms(response || []);
    } catch (error) {
      console.log("Unable to fetch health programs", error);
      setEnrolledHealthPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getEnrolledHealthProgram();
    }
  }, [token]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full px-6 md:px-10 py-8 text-white">

      {/* ===== Page Title ===== */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Enrolled Health Programs
        </h1>
        <p className="text-richblack-300 text-sm mt-2">
          Track your progress and continue your healthcare journey
        </p>
      </div>

      {enrolledHealthPrograms.length === 0 ? (
        <div className="text-center py-20 text-richblack-300">
          <p className="text-lg">
            You have not enrolled in any health program yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">

          {/* ===== Header Row (Desktop Only) ===== */}
          <div className="hidden md:grid grid-cols-3 px-6 text-xs text-richblack-400 uppercase tracking-widest">
            <p>Program</p>
            <p>Duration</p>
            <p>Progress</p>
          </div>

          {/* ===== Program Cards ===== */}
          {enrolledHealthPrograms.map((healthProgram) => (
            <div
              key={healthProgram._id}
              className="
                bg-richblack-800/60
                backdrop-blur-xl
                border border-white/10
                rounded-2xl
                p-6
                grid md:grid-cols-3 gap-6
                items-center
                transition-all duration-300
                hover:scale-[1.015]
                hover:border-blue-500/40
                shadow-lg shadow-blue-500/5
                cursor-pointer
              "
              onClick={() =>
                navigate(`/healthPrograms/${healthProgram._id}`)
              }
            >

              {/* ===== Left Section (Image + Info) ===== */}
              <div className="flex gap-4 items-center">
                <img
                  src={healthProgram.thumbnail}
                  alt="thumbnail"
                  className="w-24 h-24 rounded-xl object-cover border border-white/10"
                />

                <div>
                  <h2 className="text-lg font-semibold">
                    {healthProgram.healthProgramName}
                  </h2>
                  <p className="text-sm text-richblack-300 mt-1 line-clamp-2">
                    {healthProgram.healthProgramDescription}
                  </p>
                </div>
              </div>

              {/* ===== Duration ===== */}
              <div className="text-richblack-200 text-sm">
                <span className="md:hidden text-richblack-400 block text-xs mb-1">
                  Duration
                </span>
                {healthProgram?.totalDuration}
              </div>

              {/* ===== Progress ===== */}
              <div>
                <span className="md:hidden text-richblack-400 block text-xs mb-1">
                  Progress
                </span>

                <p className="text-sm mb-2">
                  {healthProgram.progressPercentage || 0}% Completed
                </p>

                <ProgressBar
                  completed={healthProgram.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                  bgColor="#3B82F6"
                  baseBgColor="#1E293B"
                />
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default EnrolledHealthPrograms;
