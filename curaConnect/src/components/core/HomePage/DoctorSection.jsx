import React from 'react'
import docimg from"../../../assets/Images/docimg.jpg"
import HighlightText from './HighlightText'
import CTAButton from '../HomePage/Button'
import { FaArrowRight } from 'react-icons/fa'

function DoctorSection() {
  return (
    <div className='mt-15'>
      <div className='flex flex-row gap-20 items-center'>
            <div className='w-[50%]'>
            <img
  src={docimg}
  className="h-[36rem] w-auto object-contain rounded-xl mx-auto shadow-[0_20px_60px_rgba(82,39,255,0.35)]"/>

            </div>
            <div className='w-[50%] flex flex-col gap-10'>
                <div className='text-4xl font-semibold w-[50%]'>
                    Become a 
                    <HighlightText text ={" CuraConnect Doctor"}/>
                </div>

                <p className='font-bold text-[16px] w-[80%] text-richblack-300 '>
                Healthcare professionals from around the world educate millions on CuraConnect. 
                We provide the tools and support to share your medical expertise with confidence.
                </p>
                    <div className='w-fit'>
                    <CTAButton active={true} linkto ={"/signup"}>
                <div className='flex flex-row gap-2 items-center'>
                Join as a Doctor
                <FaArrowRight/>
                </div>
                
                </CTAButton>
                    </div>
                

            </div>
      </div>
    </div>
  )
}

export default DoctorSection
