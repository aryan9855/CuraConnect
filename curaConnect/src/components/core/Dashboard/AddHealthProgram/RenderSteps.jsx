import React from "react"
import { useSelector } from "react-redux"
import { FaCheck } from "react-icons/fa"

import HealthProgramInformationForm from "./HealthProgramInformation/HealthProgramInformationForm"
import HealthProgramBuilder from "./HealthProgramBuilder/HealthProgramBuilderForm"
import PublishHealthProgram from "./PublishHealthProgram/PublishHealthProgram"

export default function RenderSteps() {
  const { step } = useSelector((state) => state.healthProgram)

  const steps = [
    { id: 1, title: "Health Program Information" },
    { id: 2, title: "Health Program Builder" },
    { id: 3, title: "Publish" },
  ]

  return (
    <>
      <div className="relative mb-14 flex w-full items-center justify-between">
        {steps.map((item, index) => {
          const isCompleted = step > item.id
          const isActive = step === item.id

          return (
            <div
              key={item.id}
              className="relative flex flex-1 flex-col items-center"
            >
              {index !== steps.length - 1 && (
                <div
                  className={`absolute top-[18px] left-1/2 h-[2px] w-full ${
                    isCompleted ? "bg-yellow-50" : "bg-richblack-600"
                  }`}
                />
              )}

              <div
                className={`z-10 grid h-9 w-9 place-items-center rounded-full border text-sm font-semibold
                  ${
                    isCompleted
                      ? "bg-yellow-50 text-richblack-900"
                      : isActive
                      ? "bg-yellow-900 text-yellow-50"
                      : "bg-richblack-800 text-richblack-400"
                  }
                `}
              >
                {isCompleted ? <FaCheck /> : item.id}
              </div>

              <p
                className={`mt-3 text-sm ${
                  isCompleted || isActive
                    ? "text-richblack-5"
                    : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
          )
        })}
      </div>

      {step === 1 && <HealthProgramInformationForm />}
      {/* step 2 & 3 later */}
      {step==2 && <HealthProgramBuilder/>}
      {step==3 && <PublishHealthProgram/>}
    </>
  )
}
