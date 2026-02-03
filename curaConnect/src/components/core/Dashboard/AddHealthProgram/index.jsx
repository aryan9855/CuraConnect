import React from 'react'
import RenderSteps from './RenderSteps'

export default function AddHealthProgram() {
  return (
    <>
      <div className="flex w-full items-start gap-x-6">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Add Health Program
          </h1>
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>
        {/* Course Upload Tips */}
        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700/50 bg-richblack-800/60 p-6 backdrop-blur-xl xl:block">
          <p className="mb-8 text-lg text-richblack-5">⚡ Health Program Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
            <li>Set the Health Program Price option or make it free.</li>
            <li>Standard size for the Health Program thumbnail is 1024x576.</li>
            <li>Video section controls the Health Program overview video.</li>
            <li>Health Program Builder is where you create & organize a Health Program.</li>
            <li>
              Add Topics in the Health Program Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              Health Program single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  )
}


