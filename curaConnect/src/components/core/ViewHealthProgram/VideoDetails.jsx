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

  if (!videoData) return null;

    return (
      <div className="flex flex-col items-center text-white px-4 py-6">
    
        {/* VIDEO SECTION */}
        <div className="w-full max-w-4xl">
    
          <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-video bg-black">
            <video
              ref={playerRef}
              className="w-full h-full object-contain"
              controls
              onEnded={() => setVideoEnded(true)}
            >
              <source src={videoData.videoUrl} type="video/mp4" />
            </video>
    
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
