import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyHealthProgram } from "../services/operations/patientFeaturesAPI";  // adjust path

function HealthProgramDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Proper destructuring
  const { healthProgramId } = useParams();

  const handleBuyHealthProgram = () => {
    if (token) {
      // ✅ Call correct function
      buyHealthProgram(
        token,
        [healthProgramId],   // send as array
        user,
        navigate,
        dispatch
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center">
      <button
        className="bg-yellow-400 px-4 py-2 rounded-md"
        onClick={handleBuyHealthProgram}
      >
        Buy Now
      </button>
    </div>
  );
}

export default HealthProgramDetails;
