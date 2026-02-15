import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import IconBtn from "../HomePage/common/IconBtn";

function VideoDetailsSidebar({ setReviewModel }) {
  const [activeStatus, setActiveStatus] = useState("");
  const [videobarActive, setVideobarActive] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    healthProgramSectionData,
    healthProgramEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewHealthProgram);

  useEffect(() => {
    if (!healthProgramSectionData?.length) return;

    const currentSectionIndex =
      healthProgramSectionData.findIndex(
        (data) => data._id === sectionId
      );

    if (currentSectionIndex === -1) return;

    const currentSubSectionIndex =
      healthProgramSectionData?.[currentSectionIndex]?.subSection?.findIndex(
        (data) => data._id === subSectionId
      );

    const activeSubSectionId =
      healthProgramSectionData?.[currentSectionIndex]?.subSection?.[
        currentSubSectionIndex
      ]?._id;

    setActiveStatus(
      healthProgramSectionData?.[currentSectionIndex]?._id
    );

    setVideobarActive(activeSubSectionId);
  }, [healthProgramSectionData, sectionId, subSectionId, location.pathname]);

  return (
    <div className="w-80 bg-richblack-900 text-white min-h-screen border-r border-richblack-700 flex flex-col">
  
      {/* HEADER SECTION */}
      <div className="p-5 border-b border-richblack-700">
  
        <div
          className="cursor-pointer text-yellow-400 hover:text-yellow-300 transition-all text-sm font-medium"
          onClick={() => navigate("/dashboard/my-health-programs")}
        >
          ← Back
        </div>
  
        <div className="mt-4">
          <IconBtn
            text="Add Review"
            onClick={() => setReviewModel(true)}
            customClasses="w-full bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-300 transition-all"
          />
        </div>
  
        <div className="mt-6">
          <p className="font-semibold text-lg leading-snug">
            {healthProgramEntireData?.healthProgramName}
          </p>
  
          <p className="text-sm text-richblack-300 mt-2">
            {completedLectures?.length} / {totalNoOfLectures} completed
          </p>
  
          {/* Progress Bar */}
          <div className="w-full h-2 bg-richblack-700 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-yellow-400 transition-all duration-300"
              style={{
                width: `${
                  totalNoOfLectures
                    ? (completedLectures?.length / totalNoOfLectures) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>
  
      </div>
  
      {/* SECTION LIST */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
  
        {healthProgramSectionData?.map((section) => (
          <div key={section._id}>
  
            {/* SECTION TITLE */}
            <div
              className="cursor-pointer font-semibold text-richblack-50 hover:text-yellow-300 transition-all"
              onClick={() => setActiveStatus(section?._id)}
            >
              {section?.sectionName}
            </div>
  
            {/* LECTURES */}
            {activeStatus === section?._id && (
              <div className="mt-3 space-y-2">
  
                {section?.subSection?.map((topic) => (
                  <div
                    key={topic._id}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
                      ${
                        videobarActive === topic._id
                          ? "bg-yellow-400 text-black shadow-md"
                          : "bg-richblack-800 hover:bg-richblack-700"
                      }
                    `}
                    onClick={() => {
                      navigate(
                        `/view-healthProgram/${healthProgramEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                      );
                      setVideobarActive(topic?._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures?.includes(topic?._id)}
                      readOnly
                      className="accent-yellow-400"
                    />
  
                    <span className="text-sm font-medium truncate">
                      {topic.title}
                    </span>
                  </div>
                ))}
  
              </div>
            )}
  
          </div>
        ))}
  
      </div>
  
    </div>
  );
  
}

export default VideoDetailsSidebar;