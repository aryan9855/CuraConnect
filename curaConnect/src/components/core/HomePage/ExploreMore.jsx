import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "./HighlightText";

const tabsName = [
  "Free",
  "New to Healthcare",
  "Most Popular",
  "Clinical Paths",
  "Career Paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);

    const result = HomePageExplore.find(
      (course) => course.tag === value
    );
    if (!result) return;

    setCourses(result.courses);
    setCurrentCard(result.courses[0].heading);
  };

  return (
    <div className="relative">
      {/* Explore more section */}
      <div className="text-4xl font-semibold text-center my-10">
        Unlock the
        <HighlightText text={" Power of Healthcare Knowledge"} />
        <p className="text-center text-lg font-semibold mt-1">
          Learn. Connect. Care Better.
        </p>
      </div>

      {/* Tabs Section */}
      <div className="hidden lg:flex gap-5 mx-auto w-max p-1 rounded-full font-medium">
        {tabsName.map((ele, index) => (
          <div
            key={index}
            onClick={() => setMyCards(ele)}
            className={`text-[16px] flex items-center gap-2 px-7 py-[7px]
              rounded-full cursor-pointer transition-all duration-200
              ${
                currentTab === ele
                  ? "bg-black text-white border border-white font-bold"
                  : "text-oklch(70.9% 0.01 56.259) border border-transparent"
              }
              hover:bg-black hover:text-white hover:border hover:border-white
            `}
          >
            {ele}
          </div>
        ))}
      </div>

      {/* Spacer for floating cards */}
      <div className="hidden lg:block lg:h-[260px]"></div>

      {/* Cards Group */}
      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full
  lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%]
  text-black lg:mb-24 mb-24 lg:px-0 px-3">

        {courses.map((ele, index) => (
          <CourseCard
            key={index}
            cardData={ele}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
