import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyHealthProgram } from "../services/operations/patientFeaturesAPI";
import { fetchHealthProgramDetails } from "../services/operations/healthProgramDetailsAPI";

import Loader from "../components/core/HomePage/common/Loader";
import Error from "./Error";
import ConfirmationModel from "../components/core/HomePage/common/ConfirmationModel";
import RatingStars from "../components/core/HomePage/common/RatingStars";
import GetAvgRating from "../utils/avgRating";
import {formatDate} from '../services/formatDate'

function HealthProgramDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { healthProgramId } = useParams();

  const [healthProgramData, setHealthProgramData] = useState(null);
  const [confirmationModel, setConfirmationModel] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);


  // ================= FETCH DETAILS =================
  useEffect(() => {
    const getHealthProgramFullDetails = async () => {
      try {
        const result = await fetchHealthProgramDetails(healthProgramId);
        setHealthProgramData(result);
      } catch (error) {
        console.log("Could not fetch health program details");
      }
    };

    getHealthProgramFullDetails();
  }, [healthProgramId]);

  // ================= AVG RATING =================
  useEffect(() => {
    if (healthProgramData?.healthProgram?.ratingAndReviews ) {
      const count = GetAvgRating(
        healthProgramData.healthProgram.ratingAndReviews
      );
      setAvgReviewCount(count);
    }
  }, [healthProgramData]);

  // ================= TOTAL LECTURES =================
  useEffect(() => {
    console.log("FULL RESPONSE:", healthProgramData);
    let lectures = 0;

    healthProgramData?.healthProgram?.healthProgramContent?.forEach(
      (section) => {
        lectures += section.subSection?.length || 0;
      }
    );

    setTotalNoOfLectures(lectures);
  }, [healthProgramData]);

  // ================= BUY HANDLER =================
  const handleBuyHealthProgram = () => {
    if (token) {
      buyHealthProgram(
        token,
        [healthProgramId],
        user,
        navigate,
        dispatch
      );
    } else {
      setConfirmationModel({
        text1: "You are not logged in",
        text2: "Please login to purchase the Health Program",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModel(null),
      });
    }
  };

  // ================= LOADING =================
  if (loading || !healthProgramData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  // ================= ERROR =================
  

  // ================= DATA =================
  const {
    _id,
    healthProgramName,
    healthProgramDescription,
    thumbnail,
    price,
    ratingAndReviews,
    patientEnrolled,
  } = healthProgramData.healthProgram;


  return (
    <div className="flex flex-col items-center p-6">

      <img
        src={thumbnail}
        alt="Health Program Thumbnail"
        className="w-[400px] rounded-lg shadow-md"
      />

      <h1 className="text-3xl font-bold mt-4">
        {healthProgramName}
      </h1>

      <p className="mt-2 text-gray-600 text-center max-w-[600px]">
        {healthProgramDescription}
      </p>

      <div className="flex items-center gap-3 mt-4">
        <span className="font-semibold">{avgReviewCount}</span>
        <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
        <span>({ratingAndReviews?.length || 0} reviews)</span>
        <span>({patientEnrolled?.length || 0} patients enrolled)</span>
      </div>

      <div>
        <p>
          Create By (`${doctor.firstName}`)
        </p>
      </div>

      <div>
        <p>
          Create At (formatDate(createAt))
        </p>
        <p>{" "} English</p>
      </div>


      <p className="mt-2">
        Total Lectures: {totalNoOfLectures}
      </p>

      <div>
        <HealthProgramDetailsCard
        healthProgram={healthProgramData?.data.HealthProgramDetails}
        setConfirmationModel={setConfirmationModel}
        handleBuyHealthProgram={handleBuyHealthProgram}/>
      </div>

      <button
        onClick={handleBuyHealthProgram}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Buy for ₹{price}
      </button>

      {confirmationModel && (
        <ConfirmationModel modelData={confirmationModel} />
      )}
    </div>
  );
}

export default HealthProgramDetails;
