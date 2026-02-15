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
    healthProgramEntireData,
    completedLectures,
  } = useSelector((state) => state.viewHealthProgram);

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD VIDEO ================= */

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

  /* ================= HELPERS ================= */

  const getIndexes = () => {
    const sectionIndex = healthProgramSectionData.findIndex(
      (sec) => sec._id.toString() === sectionId
    );

    if (sectionIndex === -1) return null;

    const subSectionIndex =
      healthProgramSectionData[sectionIndex].subSection.findIndex(
        (sub) => sub._id.toString() === subSectionId
      );

    if (subSectionIndex === -1) return null;

    return { sectionIndex, subSectionIndex };
  };

  const isFirstVideo = () => {
    const idx = getIndexes();
    return idx && idx.sectionIndex === 0 && idx.subSectionIndex === 0;
  };

  const isLastVideo = () => {
    const idx = getIndexes();
    if (!idx) return false;

    return (
      idx.sectionIndex === healthProgramSectionData.length - 1 &&
      idx.subSectionIndex ===
        healthProgramSectionData[idx.sectionIndex].subSection.length - 1
    );
  };

  const goToNextVideo = () => {
    const idx = getIndexes();
    if (!idx) return;

    const { sectionIndex, subSectionIndex } = idx;
    const currentSection = healthProgramSectionData[sectionIndex];

    if (subSectionIndex < currentSection.subSection.length - 1) {
      const nextId =
        currentSection.subSection[subSectionIndex + 1]._id;

      navigate(
        `/view-healthProgram/${healthProgramId}/section/${sectionId}/sub-section/${nextId}`
      );
    } else if (sectionIndex < healthProgramSectionData.length - 1) {
      const nextSection = healthProgramSectionData[sectionIndex + 1];
      navigate(
        `/view-healthProgram/${healthProgramId}/section/${nextSection._id}/sub-section/${nextSection.subSection[0]._id}`
      );
    }
  };

  const goToPrevVideo = () => {
    const idx = getIndexes();
    if (!idx) return;

    const { sectionIndex, subSectionIndex } = idx;

    if (subSectionIndex > 0) {
      const prevId =
        healthProgramSectionData[sectionIndex].subSection[
          subSectionIndex - 1
        ]._id;

      navigate(
        `/view-healthProgram/${healthProgramId}/section/${sectionId}/sub-section/${prevId}`
      );
    } else if (sectionIndex > 0) {
      const prevSection =
        healthProgramSectionData[sectionIndex - 1];

      navigate(
        `/view-healthProgram/${healthProgramId}/section/${prevSection._id}/sub-section/${
          prevSection.subSection[prevSection.subSection.length - 1]._id
        }`
      );
    }
  };

  /* ================= MARK COMPLETE ================= */

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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!videoData) return null;

  return (
    <div className="flex flex-col gap-5 text-white">

      <div className="relative">
        <video
          ref={playerRef}
          className="w-full rounded-md"
          controls
          onEnded={() => setVideoEnded(true)}
        >
          <source src={videoData.videoUrl} type="video/mp4" />
        </video>

        {videoEnded && (
          <div className="absolute inset-0 grid place-content-center bg-black/80">

            {!completedLectures.includes(subSectionId) && (
              <IconBtn
                disabled={loading}
                onClick={handleLectureCompletion}
                text={!loading ? "Mark As Completed" : "Loading..."}
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

      <h1 className="text-3xl font-semibold">
        {videoData.title}
      </h1>

      <p>{videoData.description}</p>

    </div>
  );
};

export default VideoDetails;