import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"

import { Autoplay, Pagination } from "swiper/modules"
import HealthProgram_Card from "./HealthProgram_Card"

const HealthProgramSlider = ({ HealthPrograms }) => {
  return (
    <div className="w-full">
      {HealthPrograms?.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={HealthPrograms.length > 3}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="pb-12"
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {HealthPrograms.map((healthProgram, index) => (
            <SwiperSlide key={index}>
              <HealthProgram_Card
                healthProgram={healthProgram}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-richblack-400 text-center py-6">
          No Health Programs Found
        </p>
      )}
    </div>
  )
}

export default HealthProgramSlider
