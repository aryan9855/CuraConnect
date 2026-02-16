import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../core/HomePage/common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";

function HealthProgram_Card({ healthProgram, Height = "h-[220px]" }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    if (healthProgram?.ratingAndReviews?.length > 0) {
      const count = GetAvgRating(healthProgram.ratingAndReviews);
      setAvgReviewCount(isNaN(count) ? 0 : count);
    } else {
      setAvgReviewCount(0);
    }
  }, [healthProgram?.ratingAndReviews]);

  if (!healthProgram) return null;

  return (
    <Link to={`/healthPrograms/${healthProgram._id}`}>
      <div className="bg-richblack-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-richblack-700">

        <img
          src={healthProgram?.thumbnail || "/placeholder-image.png"}
          alt="Health Program"
          className={`${Height} w-full object-cover`}
        />

        <div className="p-5 space-y-3">

          <h3 className="text-lg font-semibold line-clamp-1">
            {healthProgram?.healthProgramName || healthProgram?.title}
          </h3>

          <p className="text-sm text-richblack-400">
            {(() => {
              const firstName = healthProgram?.doctor?.firstName;
              const lastName = healthProgram?.doctor?.lastName;
              const doctorName = [firstName, lastName]
                .filter(Boolean)
                .join(" ");
              return doctorName || "By Expert";
            })()}
          </p>

          {/* ⭐ Rating Section */}
          <div className="flex items-center gap-2 text-sm text-richblack-300">
            <span className="font-medium">
              {isNaN(avgReviewCount) ? 0 : avgReviewCount}
            </span>

            <RatingStars
              Review_Count={isNaN(avgReviewCount) ? 0 : avgReviewCount}
              Star_Size={18}
            />

            <span>
              ({healthProgram?.ratingAndReviews?.length || 0})
            </span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-yellow-50 font-bold text-lg">
              ₹ {healthProgram?.price ?? 0}
            </p>
          </div>

        </div>
      </div>
    </Link>
  );
}

export default HealthProgram_Card;
