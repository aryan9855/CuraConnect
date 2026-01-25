import React from 'react'
import{FaArrowRight} from "react-icons/fa"
import  {Link} from "react-router-dom"
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/Button'
import docHome from "../assets/Images/docHome.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningHealthcare from '../components/core/HomePage/LearningHealthcare'


function Home() {
  return (
    <div>
      {/*Section 1*/}
    <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center
    text-white justify-center'>

    <Link to ={"/signup"}>
        <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richback-200
        transition-all duration-200 hover:scale-95 w-fit'>
            <div  className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
            transition-all duration-200 group-hover:bg-richblack-900'>
                <p>Become a Doctor</p>
                <FaArrowRight/>
            </div>
        </div>
    </Link>

    <div className='text-center text-4xl font-semibold mt-6'>
         Connecting You to 
        <HighlightText text ={" Smarter Healthcare"}/>
    </div>

    <div className='mt-4 w-[90%] text-center text-lg text-richblack-300'>
    CuraConnect lets you explore reliable healthcare information on your own schedule, connect with medical experts,
     watch informative videos across different healthcare fields, and easily book online or in-person appointments—all from one simple platform. 
    </div>

    <div className='flex flex-row gap-7 mt-8'>
      <CTAButton active = {true} linkto={"/signup"}>
        Learn more
      </CTAButton>

      <CTAButton active = {false} linkto={"/signup"}>
        Book a Demo
      </CTAButton>

    </div>

      <div className='shadow-blue-200 mx-3 my-12'>

        <video muted loop autoPlay> <source src={docHome} type='video/mp4'/>
        </video>
      </div>
    {/* code section 1*/}
    <div>
      <CodeBlocks
          position={"lg:flex-row"}

          heading={
            <div  className='text-4xl font-semibold'>
              Empower your  <HighlightText text ={"healthcare journey "}/>
              with trusted expertise
            </div>
          }

          subheading={"Our content is created and guided by experienced medical professionals, helping you learn with confidence through reliable, real-world insights."}

          ctabtn1={{
            btnText:"try it yourself",
            linkto:"/signup",
            active: true
          }}

          ctabtn2={{
            btnText:"learn more",
            linkto:"/signup",
            active: false
          }}

      />
    </div>
    </div>

    

{/* Section 2 */}
<div className="bg-pure-greys-5 text-richblack-700 py-20">

  <div className="flex justify-center">
    <div className="homepage_bg w-11/12 max-w-maxContent rounded-lg">

      {/* CONTENT WRAPPER */}
      <div className="relative z-10 px-12 py-14 space-y-24 text-white">

        {/* ================= TOP CTA ================= */}
        <div className="flex justify-center gap-7">
          <CTAButton active linkto="/signup">
            <div className="flex items-center gap-3">
              Explore Full catalog <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={false} linkto="/signup">
            Learn more
          </CTAButton>
        </div>

        {/* ================= SKILLS SECTION ================= */}
        <div className="flex justify-between items-start ">

          <div className="text-4xl font-semibold w-[45%] text-black">
            Get the Skills you need for a
            <HighlightText text=" Job that is in demand" />
          </div>

          <div className="flex flex-col gap-6 w-[40%]">
            <p className="text-black font-semibold">
              The modern healthcare ecosystem demands more than basic skills.
              CuraConnect helps you stay ahead with expert-led learning.
            </p>

            <CTAButton active linkto="/signup">
              Learn more
            </CTAButton>
          </div>

        </div>

        <TimelineSection />

        <LearningHealthcare />

      </div>
    </div>
  </div>
</div>


      {/*Section 3*/}



      {/*Footer*/}

    </div>
  )
}

export default Home
