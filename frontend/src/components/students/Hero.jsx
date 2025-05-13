import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full pt-20 md:pt-32 px-6 md:px-0 space-y-8 text-center bg-gradient-to-b from-blue-100 via-white to-white">
      <h1 className="md:text-[48px] text-[34px] relative font-extrabold text-gray-900 max-w-4xl mx-auto leading-tight">
        Discover, Learn, and Grow with Courses that
        <span className="text-indigo-600"> empower your future.</span>
        <img
          src={assets.sketch}
          alt="sketch"
          className="hidden md:block absolute -bottom-7 right-0"
        />
      </h1>

      <p className="hidden md:block text-gray-700 text-lg max-w-2xl mx-auto">
        Explore curated courses by top instructors, tailored to your passions
        and profession. Gain the skills to thrive in a changing world.
      </p>

      <p className="md:hidden text-gray-700 max-w-sm text-base mx-auto">
        Learn anytime, from anywhere. Boost your career with expert-led online
        courses.
      </p>

      <SearchBar />
    </div>
  );
};

export default Hero;
