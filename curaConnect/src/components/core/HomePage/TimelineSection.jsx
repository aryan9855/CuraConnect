import React from "react";
import { FaUserMd, FaShieldAlt, FaHospital, FaBrain } from "react-icons/fa";
import timelineImg from "../../../assets/Images/timelineImg.jpg";

const timeline = [
  {
    Icon: <FaUserMd size={22} className="text-red-500" />,
    Heading: "Medical Leadership",
    Description:
      "Driven by experienced healthcare professionals committed to better patient outcomes",
  },
  {
    Icon: <FaShieldAlt size={22} className="text-sky-500" />,
    Heading: "Patient Responsibility",
    Description:
      "Your health, safety, and privacy are always our top priority",
  },
  {
    Icon: <FaHospital size={22} className="text-purple-600" />,
    Heading: "Flexible Care",
    Description:
      "Consult doctors anytime with online or in-person appointment options",
  },
  {
    Icon: <FaBrain size={22} className="text-red-600" />,
    Heading: "Smart Health Solutions",
    Description:
      "Connecting problems with the right medical expertise and solutions",
  },
];

function TimelineSection() {
  return (
    <section className="w-full">
      <div className="max-w-6xl mx-auto px-6 py-16 flex items-center gap-12">

        {/* LEFT — GLASS TIMELINE */}
        <div
          className="
            flex-1
            relative
            rounded-2xl p-6
            bg-white/10
            backdrop-blur-sm
            border border-white/20
            shadow-lg
            overflow-hidden
          "
        >
          <div className="absolute inset-0 bg-white/5 pointer-events-none rounded-2xl" />

          <div className="relative z-10 flex flex-col gap-6">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center shrink-0">
                  {item.Icon}
                </div>

                <div>
                  <h2 className="font-semibold text-[18px] text-richblack-900">
                    {item.Heading}
                  </h2>
                  <p className="mt-1 text-base text-richblack-700">
                    {item.Description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — IMAGE (NOW ACTUALLY WIDER) */}
        <div className="flex-1 min-w-[560px] flex justify-end relative">
          <img
            src={timelineImg}
            alt="Healthcare timeline"
            className="
              w-auto
              max-h-auto
              object-contain
              rounded-lg
              shadow-lg
            "
          />

                    <div
                    className="
                        absolute bottom-0 
                        translate-x-[-4%] translate-y-[60%]
                        bg-green-700 flex text-white uppercase
                        py-7 rounded-lg shadow-lg
                    "
                    >
            <div className="flex flex-row gap-4 items-center border-r border-green-300 px-4">
                <p className="text-3xl font-bold">30+</p>
                <p className="text-green-300 text-sm">Years of Experience</p>
            </div>

            <div className="flex gap-4 items-center px-4 text-center">
                <p className="text-3xl font-bold">100+</p>
                <p className="text-green-300 text-sm">Type of <br />Health Programs</p>
            </div>
            </div>

        </div>

      </div>
    </section>
  );
}

export default TimelineSection;
