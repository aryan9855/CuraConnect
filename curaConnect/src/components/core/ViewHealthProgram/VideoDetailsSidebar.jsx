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
    <div className="w-80 bg-richblack-800 text-white min-h-screen p-4">
      <div className="mb-4">
        <div
          className="cursor-pointer text-yellow-400"
          onClick={() => navigate("/dashboard/my-health-programs")}
        >
          ← Back
        </div>

        <div className="mt-2">
          <IconBtn
            text="Add Review"
            onClick={() => setReviewModel(true)}
          />
        </div>

        <div className="mt-4">
          <p className="font-semibold">
            {healthProgramEntireData?.healthProgramName}
          </p>
          <p>
            {completedLectures?.length} / {totalNoOfLectures}
          </p>
        </div>
      </div>

      <div>
        {healthProgramSectionData?.map((section) => (
          <div key={section._id}>
            <div
              className="cursor-pointer font-semibold mt-4"
              onClick={() => setActiveStatus(section?._id)}
            >
              {section?.sectionName}
            </div>

            {activeStatus === section?._id && (
              <div>
                {section?.subSection?.map((topic) => (
                  <div
                    key={topic._id}
                    className={`flex gap-3 p-3 cursor-pointer ${
                      videobarActive === topic._id
                        ? "bg-yellow-400 text-black"
                        : "bg-richblack-700"
                    }`}
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
                    />
                    <span>{topic.title}</span>
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
