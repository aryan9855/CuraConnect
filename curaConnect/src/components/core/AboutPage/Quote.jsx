import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className="text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white">
      We are passionate about transforming the way people{" "}
      <HighlightText text={"access healthcare knowledge"} />, combining{" "}
      <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
        expertise
      </span>
      , technology, and compassion to create an{" "}
      <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
        unparalleled digital healthcare experience.
      </span>
    </div>
  )
}

export default Quote
