import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import { FaStar } from "react-icons/fa"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"

import { apiConnector } from "../../../../services/apiconnector"
import { ratingsEndpoints } from "../../../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 18

  useEffect(() => {
    ;(async () => {
      try {
        const response = await apiConnector(
          "GET",
          ratingsEndpoints.GET_REVIEWS_API
        )

        if (response?.data?.success) {
          setReviews(response.data.data)
        }
      } catch (error) {
        console.log("Error fetching reviews", error)
      }
    })()
  }, [])

  if (!reviews.length) return null

  return (
    <div className="w-full py-16 bg-gradient-to-b from-richblack-900 to-richblack-800 text-white">
      
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-yellow-400">
          Patient Success Stories
        </h2>
        <p className="text-richblack-300 mt-2">
          What our patients say about CuraConnect
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-6">
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          loop={reviews.length > 4}
          autoplay={
            reviews.length > 1
              ? {
                  delay: 3000,
                  disableOnInteraction: false,
                }
              : false
          }
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="
                h-[260px]
                bg-white/5
                backdrop-blur-lg
                border border-white/10
                rounded-2xl
                p-6
                flex flex-col justify-between
                shadow-xl
                hover:shadow-yellow-500/20
                hover:-translate-y-2
                transition-all duration-300
              ">

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={
                      review?.user?.image
                        ? review?.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt="user"
                    className="h-12 w-12 rounded-full object-cover border-2 border-yellow-400"
                  />

                  <div>
                    <h3 className="font-semibold text-lg text-white">
                      {review?.user?.firstName} {review?.user?.lastName}
                    </h3>
                    <p className="text-sm text-richblack-400">
                      {review?.healthProgram?.healthProgramName}
                    </p>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-sm text-richblack-200 leading-relaxed mt-4">
                  {review?.review?.split(" ").length > truncateWords
                    ? `${review.review
                        .split(" ")
                        .slice(0, truncateWords)
                        .join(" ")}...`
                    : review?.review}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-4">
                  <span className="font-semibold text-yellow-400 text-lg">
                    {Number(review?.rating || 0).toFixed(1)}
                  </span>

                  <ReactStars
                    count={5}
                    value={Number(review?.rating || 0)}
                    size={18}
                    edit={false}
                    activeColor="#facc15"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
