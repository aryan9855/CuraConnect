import React from "react";
import CTAButton from "./Button";
import ECGCard from "./ECGCard";

function CodeBlocks({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
}) {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>

      {/* Section 1 (Text) */}
      <div className="w-[50%] flex flex-col gap-8">
        {heading}

        <div className=" font-bold">
          {subheading}
        </div>

        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 (ECG CARD ) */}
      <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
        <ECGCard />
      </div>

    </div>
  );
}

export default CodeBlocks;
