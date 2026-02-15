import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { markLectureAsComplete } from "../../../services/operations/healthProgramDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewHealthProgramSlice";

import IconBtn from "../../core/HomePage/common/IconBtn";

const VideoDetails = () => {
  const { healthProgramId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const {
    healthProgramSectionData,
    completedLectures,
  } = useSelector((state) => state.viewHealthProgram);

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!healthProgramSectionData?.length) return;

    const currentSection = healthProgramSectionData.find(
      (section) => section._id.toString() === sectionId
    );

    if (!currentSection) return;

    const currentSubSection = currentSection.subSection.find(
      (sub) => sub._id.toString() === subSectionId
    );

    if (!currentSubSection) return;

    setVideoData(currentSubSection);
    setVideoEnded(false);
  }, [healthProgramSectionData, sectionId, subSectionId]);

  const handleLectureCompletion = async () => {
    try {
      setLoading(true);

      const res = await markLectureAsComplete(
        { healthProgramId, subsectionId: subSectionId },
        token
      );

      if (res) {
        dispatch(updateCompletedLectures(subSectionId));
      }
    } finally {
      setLoading(false);
    }
  };

  // Get current section index
const sectionIndex = healthProgramSectionData.findIndex(
  (section) => section._id.toString() === sectionId
);

// Get current subsection index
const subSectionIndex =
  sectionIndex >= 0
    ? healthProgramSectionData[sectionIndex].subSection.findIndex(
        (sub) => sub._id.toString() === subSectionId
      )
    : -1;

// Check if first video
const isFirstVideo = () => {
  return sectionIndex === 0 && subSectionIndex === 0;
};

// Check if last video
const isLastVideo = () => {
  if (sectionIndex === -1 || subSectionIndex === -1) return true;

  const lastSectionIndex = healthProgramSectionData.length - 1;
  const lastSubSectionIndex =
    healthProgramSectionData[lastSectionIndex].subSection.length - 1;

  return (
    sectionIndex === lastSectionIndex &&
    subSectionIndex === lastSubSectionIndex
  );
};

// Go to previous video
const goToPrevVideo = () => {
  if (sectionIndex === -1 || subSectionIndex === -1) return;

  if (subSectionIndex > 0) {
    const prevSub =
      healthProgramSectionData[sectionIndex].subSection[
        subSectionIndex - 1
      ];

    navigate(
      `/view-healthProgram/${healthProgramId}/section/${sectionId}/sub-section/${prevSub._id}`
    );
  } else if (sectionIndex > 0) {
    const prevSection =
      healthProgramSectionData[sectionIndex - 1];

    const lastSub =
      prevSection.subSection[
        prevSection.subSection.length - 1
      ];

    navigate(
      `/view-healthProgram/${healthProgramId}/section/${prevSection._id}/sub-section/${lastSub._id}`
    );
  }
};

// Go to next video
const goToNextVideo = () => {
  if (sectionIndex === -1 || subSectionIndex === -1) return;

  const currentSection =
    healthProgramSectionData[sectionIndex];

  if (subSectionIndex < currentSection.subSection.length - 1) {
    const nextSub =
      currentSection.subSection[subSectionIndex + 1];

    navigate(
      `/view-healthProgram/${healthProgramId}/section/${sectionId}/sub-section/${nextSub._id}`
    );
  } else if (
    sectionIndex < healthProgramSectionData.length - 1
  ) {
    const nextSection =
      healthProgramSectionData[sectionIndex + 1];

    const firstSub = nextSection.subSection[0];

    navigate(
      `/view-healthProgram/${healthProgramId}/section/${nextSection._id}/sub-section/${firstSub._id}`
    );
  }
};


  if (!videoData) return null;

    return (
      <div className="flex flex-col items-center text-white px-4 py-6">
    
        {/* VIDEO SECTION */}
        <div className="w-full max-w-4xl">
    
          <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-video bg-black">
            <video
              key={subSectionId}
              ref={playerRef}
              className="w-full h-full object-contain"
              controls
              src={videoData.videoUrl}
              onEnded={() => setVideoEnded(true)}
            />
    
            {videoEnded && (
              <div className="absolute inset-0 grid place-content-center bg-black/80 backdrop-blur-sm">
    
                {!completedLectures.includes(subSectionId) && (
                  <IconBtn
                    disabled={loading}
                    onClick={handleLectureCompletion}
                    text={!loading ? "Mark As Completed" : "Loading..."}
                    customClasses="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-md"
                  />
                )}
    
                <IconBtn
                  disabled={loading}
                  onClick={() => {
                    if (playerRef.current) {
                      playerRef.current.currentTime = 0;
                      playerRef.current.play();
                      setVideoEnded(false);
                    }
                  }}
                  text="Rewatch"
                  customClasses="mt-3"
                />
    
                <div className="mt-6 flex gap-4 justify-center">
                  {!isFirstVideo() && (
                    <button onClick={goToPrevVideo} className="blackButton">
                      Prev
                    </button>
                  )}
                  {!isLastVideo() && (
                    <button onClick={goToNextVideo} className="blackButton">
                      Next
                    </button>
                  )}
                </div>
    
              </div>
            )}
          </div>
        </div>
    
        {/* TITLE + DESCRIPTION SECTION */}
        <div className="w-full max-w-4xl mt-6">
          <h1 className="text-3xl font-semibold mb-4">
            {videoData.title}
          </h1>
    
          <p className="text-richblack-200 leading-relaxed">
            {videoData.description}
          </p>
        </div>
    
      </div>
    );
    
};

export default VideoDetails;
