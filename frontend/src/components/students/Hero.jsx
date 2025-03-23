import React from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";
const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-30 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-green-200 via-white to-white">
      <h1 className="md:text-[48px] text-[34px] relative font-bold text-gray-800 max-w-4xl mx-auto">
        Unlock new possibilities with courses that
        <span className="text-blue-600"> align with your ambitions.</span>
        <img
          src={assets.sketch}
          alt="sketch"
          className="hidden md:block absolute -bottom-7 right-0"
        />
      </h1>

      <p className="md:block hidden text-gray-500 max-w-2xl mx-auto">
        Join a community of learners with expert instructors, engaging content,
        and the support you need to reach your goals.
      </p>

      <p className=" md:hidden text-gray-500 max-w-sm mx-auto">
        we bring together world-class instructors to help ypu achieve your
        professional goals
      </p>
      <SearchBar />
    </div>
  );
};

export default Hero;
