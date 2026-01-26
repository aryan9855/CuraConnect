import React from 'react'
import HighlightText from './HighlightText'
import img1 from '../../../assets/Images/img1.jpg'
import img2 from '../../../assets/Images/img2.jpg'
import img3 from '../../../assets/Images/img3.jpg'
import CTAButton from '../HomePage/Button'

function LearningHealthcare() {
  return (
    <div >
      <div  className='flex flex-col gap-5 items-center'>

          <div className='text-4xl font-semibold text-center text-black'>
          Your All-in-One Platform for 
            <HighlightText text={" Smarter Healthcare"}/>
          </div>

          <div className='text-center text-richblack-800 mx-auto text-base font-semibold w-[70%] '>
          Using CuraConnect, managing your healthcare is simple learn from medical experts,
           connect with doctors, book appointments, track your progress, and follow a personalized care schedule.
          </div>

                    <div className="flex items-center justify-center gap-14 mt-5">
            <div className="relative rotate-[-6deg]">
              <div className="absolute -inset-4 bg-cyan-500/40 blur-2xl rounded-2xl"></div>
              <div className="relative p-4 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30">
                <img src={img1} className="h-40 w-auto object-contain" />
              </div>
            </div>

            <div className="relative rotate-[4deg]">
              <div className="absolute -inset-4 bg-purple-500/40 blur-2xl rounded-2xl"></div>
              <div className="relative p-4 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30">
                <img src={img3} className="h-40 w-auto object-contain" />
              </div>
            </div>

            <div className="relative rotate-[-3deg]">
              <div className="absolute -inset-4 bg-emerald-500/40 blur-2xl rounded-2xl"></div>
              <div className="relative p-4 rounded-xl bg-gradient-to-br from-emerald-500/30 to-cyan-500/30">
                <img src={img2} className="h-40 w-auto object-contain" />
              </div>
            </div>
          </div>

      <div className='w-fit mt-10'>
        <CTAButton active={true} linkto = {"/signup"}>
          Learn More
        </CTAButton>
      </div>
      </div>
    </div>
  )
}

export default LearningHealthcare
