import React from "react"
import HighlightText from "../components/core/HomePage/HighlightText"
import BannerImg1 from "../assets/Images/about1.jpg"
import BannerImg2 from "../assets/Images/about2.jpg"
import BannerImg3 from "../assets/Images/about3.jpg"
import Quote from "../components/core/AboutPage/Quote"
import timelineImg from "../assets/Images/timelineImg.jpg"
import StatsComponents from "../components/core/AboutPage/StatsComponents"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import ContactFormSection from "../components/core/AboutPage/ContactFormSection"


function About() {
  return (
    <div className="text-white">

      {/* ================= SECTION 1 : HERO ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <div
          className="
            rounded-2xl p-10
            bg-white/10 backdrop-blur-sm
            border border-white/20
            shadow-lg
          "
        >
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Driving Innovation in Digital Healthcare for a
            <HighlightText text={" Healthier Tomorrow"} />
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base md:text-lg text-richblack-200 leading-relaxed">
            CuraConnect is at the forefront of digital healthcare education. We
            empower individuals with trusted medical knowledge, expert guidance,
            and modern healthcare technologies—building a smarter, healthier
            future together.
          </p>

          {/* Banner Images */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {[BannerImg1, BannerImg2, BannerImg3].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`About banner ${i + 1}`}
                className="
                  h-36 sm:h-44 md:h-52
                  rounded-xl object-cover
                  shadow-md
                  hover:scale-105 transition-transform duration-300
                "
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 2 : QUOTE ================= */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Quote />
      </section>

      {/* ================= SECTION 3 : STORY ================= */}
<section className="mx-auto max-w-7xl px-6 py-24 space-y-32">

{/* Founding Story */}
<div className="flex flex-col-reverse lg:flex-row items-center gap-16">

  <div
    className="
      lg:w-1/2
      rounded-2xl p-8
      bg-white/10 backdrop-blur-sm
      border border-white/20
      shadow-lg
      space-y-6
      transition-all duration-300
      hover:scale-[1.03]
      hover:bg-white/15
      hover:shadow-2xl
    "
  >
    <h2 className="text-4xl font-semibold
                   bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400
                   bg-clip-text text-transparent">
      Our Founding Story
    </h2>

    <p className="text-richblack-200 leading-relaxed">
      CuraConnect was founded with a simple yet powerful idea—make
      reliable healthcare knowledge accessible to everyone.
    </p>

    <p className="text-richblack-200 leading-relaxed">
      We bridge the gap between patients and professionals by combining
      medical expertise, technology, and human-centered design.
    </p>
  </div>

  {/* Image with hover */}
  <div className="lg:w-1/2 flex justify-center">
    <img
      src={timelineImg}
      alt="CuraConnect journey"
      className="
        rounded-2xl
        max-h-[360px]
        object-cover
        shadow-[0_0_30px_rgba(252,103,103,0.35)]
        transition-all duration-300
        hover:scale-105
        hover:shadow-[0_0_40px_rgba(252,103,103,0.55)]
      "
    />
  </div>
</div>

{/* Vision & Mission */}
<div className="flex flex-col lg:flex-row gap-12">

  {/* Vision */}
  <div
    className="
      lg:w-1/2
      rounded-2xl p-8
      bg-white/10 backdrop-blur-sm
      border border-white/20
      shadow-lg
      space-y-6
      transition-all duration-300
      hover:scale-[1.03]
      hover:bg-white/15
      hover:shadow-2xl
    "
  >
    <h2 className="text-4xl font-semibold
                   bg-gradient-to-r from-orange-400 to-yellow-400
                   bg-clip-text text-transparent">
      Our Vision
    </h2>

    <p className="text-richblack-200 leading-relaxed">
      To redefine digital healthcare by empowering individuals with
      accurate information, expert access, and intelligent tools.
    </p>
  </div>

  {/* Mission */}
  <div
    className="
      lg:w-1/2
      rounded-2xl p-8
      bg-white/10 backdrop-blur-sm
      border border-white/20
      shadow-lg
      space-y-6
      transition-all duration-300
      hover:scale-[1.03]
      hover:bg-white/15
      hover:shadow-2xl
    "
  >
    <h2 className="text-4xl font-semibold
                   bg-gradient-to-r from-blue-400 via-cyan-400 to-green-300
                   bg-clip-text text-transparent">
      Our Mission
    </h2>

    <p className="text-richblack-200 leading-relaxed">
      To connect patients, doctors, and educators through a collaborative
      digital ecosystem—making healthcare simple, reliable, and human.
    </p>
  </div>

</div>
</section>

{/* Section 4 */}
<StatsComponents />

{/* section 5 */}

<section className="mx-auto flex flex-col items-center justify-between gap-3">
    <LearningGrid/>
    <ContactFormSection/>
</section>

    </div>
  )
}

export default About
