import React from "react"
import { useSelector } from "react-redux"
import { FaCheck } from "react-icons/fa"

import HealthProgramInformationForm from "./HealthProgramInformation/HealthProgramInformationForm"

function RenderSteps() {
  const { step } = useSelector((state) => state.healthProgram)

  const steps = [
    { id: 1, title: "Health Program Information" },
    { id: 2, title: "Health Program Builder" },
    { id: 3, title: "Publish" },
  ]

  return (
    <div>
      {/* Step Indicators */}
      <div className="flex gap-6">
        {steps.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border
                ${
                  step === item.id
                    ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                    : "bg-black border-black text-white"
                }`}
            >
              {step > item.id ? <FaCheck /> : item.id}
            </div>
          </div>
        ))}
      </div>

      {/* Step Titles */}
      <div className="mt-4 flex gap-6">
        {steps.map((item) => (
          <p key={item.id} className="text-sm">
            {item.title}
          </p>
        ))}
      </div>

      {/* Step Forms */}
      <div className="mt-6">
        {step === 1 && <HealthProgramInformationForm />}
        {/* {step === 2 && <HealthProgramBuilderForm />} */}
        {/* {step === 3 && <PublishHealthProgram />} */}
      </div>
    </div>
  )
}

export default RenderSteps
