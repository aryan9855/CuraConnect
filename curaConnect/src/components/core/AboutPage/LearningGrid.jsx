import React from "react"
import HighlightText from "../../../components/core/HomePage/HighlightText"
import CTAButton from "../../../components/core/HomePage/Button"

const LearningGridArray = [
  {
    order: -1,
    heading: "Trusted Healthcare Learning for",
    highlightText: "Everyone, Everywhere",
    description:
      "CuraConnect collaborates with medical professionals, healthcare institutions, and experts to deliver reliable, accessible, and practical healthcare education for patients and practitioners worldwide.",
    BtnText: "Explore CuraConnect",
    BtnLink: "/about",
  },
  {
    order: 1,
    heading: "Programs Designed by Medical Experts",
    description:
      "Our healthcare programs are curated by experienced doctors and specialists to ensure accuracy, relevance, and real-world applicability.",
  },
  {
    order: 2,
    heading: "Smart Learning Methods",
    description:
      "Learn through videos, expert sessions, real case studies, and guided healthcare programs designed for clarity and impact.",
  },
  {
    order: 3,
    heading: "Verified Certifications",
    description:
      "Earn certifications backed by healthcare professionals that build trust and credibility in your learning journey.",
  },
  {
    order: 4,
    heading: "Insight-Based Progress Tracking",
    description:
      "Track your learning and health progress with intelligent insights designed to keep you informed and motivated.",
  },
  {
    order: 5,
    heading: "Ready for Real-World Healthcare",
    description:
      "Whether you're a patient or a practitioner, CuraConnect prepares you to make confident, informed healthcare decisions.",
  },
]

const LearningGrid = () => {
  return (
    <div className="mx-auto mb-20 w-full max-w-7xl px-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">

        {LearningGridArray.map((card, i) => (
          <div
            key={i}
            className={`
              rounded-2xl
              p-8
              transition-all duration-300
              ${
                card.order < 0
                  ? "xl:col-span-2 bg-transparent"
                  : card.order % 2 === 0
                  ? "bg-white/10 backdrop-blur-sm border border-white/20"
                  : "bg-white/5 backdrop-blur-sm border border-white/10"
              }
              ${
                card.order === 3 ? "xl:col-start-2" : ""
              }
              hover:scale-[1.03]
              hover:shadow-2xl
            `}
          >
            {card.order < 0 ? (
              <div className="flex flex-col gap-5">
                <h2 className="text-4xl font-semibold text-white">
                  {card.heading}{" "}
                  <HighlightText text={card.highlightText} />
                </h2>

                <p className="text-richblack-300 leading-relaxed">
                  {card.description}
                </p>

                <div className="mt-2 w-fit">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between gap-6">
                <h3 className="text-lg font-semibold text-richblack-5">
                  {card.heading}
                </h3>

                <p className="text-sm text-richblack-300 leading-relaxed">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  )
}

export default LearningGrid
 