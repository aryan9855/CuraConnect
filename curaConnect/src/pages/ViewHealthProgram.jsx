import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams, useNavigate, useLocation } from "react-router-dom";

import { fetchFullHealthProgramDetails } from "../services/operations/healthProgramDetailsAPI";

import {
  setEntireHealthProgramData,
  setHealthProgramSectionData,
  setCompletedLectures,
  setTotalNoOfLectures,
} from "../slices/viewHealthProgramSlice";

import VideoDetailsSidebar from "../components/core/ViewHealthProgram/VideoDetailsSidebar";
import HealthProgramReviewModel from "../components/core/ViewHealthProgram/HealthProgramReviewModel";

function ViewHealthProgram() {
  const [reviewModel, setReviewModel] = useState(false);

  const { healthProgramId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!token) return;

      const response = await fetchFullHealthProgramDetails(
        healthProgramId,
        token
      );

      if (!response) return;

      const healthProgramDetails = response?.healthProgram;
      const completedVideos = response?.completedVideos;

      if (!healthProgramDetails) return;

      const sections =
        healthProgramDetails.healthProgramContent || [];

      dispatch(setHealthProgramSectionData(sections));
      dispatch(setEntireHealthProgramData(healthProgramDetails));
      dispatch(setCompletedLectures(completedVideos || []));

      let totalLectures = 0;
      sections.forEach((sec) => {
        totalLectures += sec.subSection.length;
      });

      dispatch(setTotalNoOfLectures(totalLectures));

      // ✅ Only redirect if user is on base route
      if (
        location.pathname ===
        `/view-healthProgram/${healthProgramId}`
      ) {
        if (sections.length > 0) {
          const firstSection = sections[0];
          const firstSubSection =
            firstSection?.subSection?.[0];

          if (firstSection && firstSubSection) {
            navigate(
              `/view-healthProgram/${healthProgramId}/section/${firstSection._id}/sub-section/${firstSubSection._id}`,
              { replace: true }
            );
          }
        }
      }
    };

    fetchDetails();
  }, [healthProgramId, token, dispatch, navigate, location.pathname]);

  return (
    <div className="flex">
      <VideoDetailsSidebar setReviewModel={setReviewModel} />
      <div className="flex-1">
        <Outlet />
      </div>
      {reviewModel && (
        <HealthProgramReviewModel
          setReviewModel={setReviewModel}
        />
      )}
    </div>
  );
}

export default ViewHealthProgram;
