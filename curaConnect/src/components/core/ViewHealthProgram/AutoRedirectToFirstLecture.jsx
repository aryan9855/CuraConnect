import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function AutoRedirectToFirstLecture() {
  const { healthProgramId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { healthProgramSectionData } = useSelector(
    (state) => state.viewHealthProgram
  );

  useEffect(() => {
    if (!healthProgramSectionData?.length) return;

    // Only redirect if we are exactly at parent route
    if (location.pathname !== `/view-healthProgram/${healthProgramId}`)
      return;

    const firstSection = healthProgramSectionData[0];
    const firstSubSection = firstSection?.subSection?.[0];

    if (firstSection && firstSubSection) {
      navigate(
        `/view-healthProgram/${healthProgramId}/section/${firstSection._id}/sub-section/${firstSubSection._id}`,
        { replace: true }
      );
    }
  }, [healthProgramSectionData, location.pathname]);

  return null;
}

export default AutoRedirectToFirstLecture;