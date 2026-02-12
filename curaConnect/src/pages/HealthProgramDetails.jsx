import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { buyHealthProgram } from "../services/operations/patientFeaturesAPI";
import { fetchHealthProgramDetails } from "../services/operations/healthProgramDetailsAPI";
import { addToCart } from "../slices/cartSlice";

import Loader from "../components/core/HomePage/common/Loader";
import ConfirmationModel from "../components/core/HomePage/common/ConfirmationModel";
import RatingStars from "../components/core/HomePage/common/RatingStars";

import GetAvgRating from "../utils/avgRating";
import { formatDate } from "../services/formatDate";

function HealthProgramDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { healthProgramId } = useParams();

  const [healthProgramData, setHealthProgramData] = useState(null);
  const [confirmationModel, setConfirmationModel] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [isActive, setIsActive] = useState([]);

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
    if (healthProgramData?.healthProgram?.ratingAndReviews) {
      const count = GetAvgRating(
        healthProgramData.healthProgram.ratingAndReviews
      );
      setAvgReviewCount(count);
    }
  }, [healthProgramData]);

  // ================= TOTAL LECTURES =================
  useEffect(() => {
    let lectures = 0;

    healthProgramData?.healthProgram?.healthProgramContent?.forEach(
      (section) => {
        lectures += section.subSection?.length || 0;
      }
    );

    setTotalNoOfLectures(lectures);
  }, [healthProgramData]);

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e !== id)
    );
  };

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

  // ================= ADD TO CART =================
  const handleAddToCart = () => {
    if (!token) {
      setConfirmationModel({
        text1: "You are not logged in",
        text2: "Please login to add this Health Program to cart",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModel(null),
      });
      return;
    }

    dispatch(addToCart(healthProgramData.healthProgram));
  };

  if (loading || !healthProgramData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  const {
    _id,
    healthProgramName,
    healthProgramDescription,
    thumbnail,
    price,
    ratingAndReviews,
    patientsEnrolled,
    doctor,
    createdAt,
    instructions,
    whatYouWillLearn,
    healthProgramContent,
  } = healthProgramData.healthProgram;

  const isEnrolled =
    user && patientsEnrolled?.includes(user?._id);

  const isInCart =
    cart?.some((item) => item._id === _id);

  return (
    <div className="w-full min-h-screen text-white px-6 py-10">

      <div className="max-w-[1200px] mx-auto">

        {/* ================= TOP SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
          <div
    className="
      space-y-6
      bg-white/5
      backdrop-blur-xl
      border border-white/10
      rounded-2xl
      p-8
      shadow-xl
    "
  >
            <div
    className="
      space-y-6
      bg-white/5
      backdrop-blur-xl
      border border-white/10
      rounded-2xl
      p-8
      shadow-xl
    "
  >
            <h1 className="text-4xl font-bold">
              {healthProgramName}
            </h1>
            </div>

            <p className="text-richblack-300 text-lg">
              {healthProgramDescription}
            </p>

            <div className="flex items-center gap-3 text-sm">
              <span className="font-semibold text-yellow-200">
                {avgReviewCount}
              </span>

              <RatingStars
                Review_Count={avgReviewCount}
                Star_Size={20}
              />

              <span>
                ({ratingAndReviews?.length || 0} reviews)
              </span>

              <span>
                • {patientsEnrolled?.length || 0} patients enrolled
              </span>
            </div>

            <div className="text-sm text-richblack-300 space-y-1">
              <p>
                Created By{" "}
                <span className="text-blue-300 font-semibold">
                  {doctor?.firstName} {doctor?.lastName}
                </span>
              </p>

              <p>
                Created At {createdAt ? formatDate(createdAt) : ""}
              </p>

              <p>Language: English</p>
              <p>Total Lectures: {totalNoOfLectures}</p>
            </div>
          </div>
            </div>

          {/* RIGHT SIDE PURCHASE CARD */}
          <div className="bg-richblack-800 rounded-xl p-6 shadow-xl h-fit sticky top-24">

            <img
              src={thumbnail}
              alt="Health Program Thumbnail"
              className="rounded-lg w-full mb-4"
            />

            <p className="text-3xl font-bold mb-4">
              ₹ {price}
            </p>

            {isEnrolled ? (
              <button
                onClick={() =>
                  navigate("/dashboard/enrolled-health-programs")
                }
                className="w-full bg-green-600 hover:bg-green-700 transition py-3 rounded-lg font-semibold"
              >
                Go to Health Program
              </button>
            ) : (
              <>
                <button
                  onClick={handleBuyHealthProgram}
                  className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold mb-3"
                >
                  Buy Now
                </button>

                <button
                  onClick={handleAddToCart}
                  disabled={isInCart}
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    isInCart
                      ? "bg-richblack-600 cursor-not-allowed"
                      : "bg-yellow-400 hover:bg-yellow-500 text-black"
                  }`}
                >
                  {isInCart ? "Already in Cart" : "Add To Cart"}
                </button>
              </>
            )}

            <div className="mt-6 text-sm text-richblack-300 space-y-1">
              <p>✔ Lifetime access</p>
              <p>✔ Expert medical guidance</p>
              <p>✔ Certificate of completion</p>
            </div>
          </div>
        </div>

        {/* ================= WHAT YOU WILL LEARN ================= */}
        <div className="mt-12 bg-richblack-800 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">
            What You Will Learn
          </h2>
          <p className="text-richblack-300">
            {whatYouWillLearn}
          </p>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="mt-12 bg-richblack-800 rounded-xl p-8">

          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold">
                Health Program Content
              </h2>
              <p className="text-sm text-richblack-300 mt-1">
                {healthProgramContent?.length || 0} section(s) •{" "}
                {totalNoOfLectures} lectures •{" "}
                {healthProgramData.totalDuration}
              </p>
            </div>

            <button
              onClick={() => setIsActive([])}
              className="text-blue-400 text-sm hover:text-blue-300"
            >
              Collapse All Sections
            </button>
          </div>

          <div className="space-y-4">
            {healthProgramContent?.map((section) => (
              <div
                key={section._id}
                className="border border-richblack-700 rounded-lg p-4"
              >
                <div
                  onClick={() => handleActive(section._id)}
                  className="flex justify-between cursor-pointer"
                >
                  <h3 className="font-semibold">
                    {section.sectionName}
                  </h3>
                  <span>
                    {section.subSection?.length || 0} lecture(s)
                  </span>
                </div>

                {isActive.includes(section._id) && (
                  <div className="mt-4 space-y-2">
                    {section.subSection?.map((lecture) => (
                      <div
                        key={lecture._id}
                        className="text-sm text-richblack-300 pl-4"
                      >
                        • {lecture.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {confirmationModel && (
        <ConfirmationModel modelData={confirmationModel} />
      )}
    </div>
  );
}

export default HealthProgramDetails;
