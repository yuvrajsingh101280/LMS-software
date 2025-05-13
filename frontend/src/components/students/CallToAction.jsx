import React from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-5 pt-16 pb-24 px-6 w-full md:px-0 bg-gradient-to-b from-blue-50 to-white text-center">
      <h1 className="text-3xl md:text-5xl text-blue-800 font-bold max-w-2xl leading-tight">
        Unlock Your Potential with Academix
      </h1>

      <p className="text-gray-600 text-sm md:text-base max-w-xl mt-2">
        Join thousands of learners who trust Academix to build real-world
        skills. Learn at your own pace, from anywhere, with courses designed to
        elevate your career.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center font-medium gap-4 mt-6">
        <button className="px-8 py-3 rounded-md text-white bg-blue-700 hover:bg-blue-800 transition duration-200">
          Enroll Now
        </button>
        <button
          className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition cursor-pointer"
          onClick={() => navigate("/course-list")}
        >
          Explore Courses{" "}
          <img src={assets.arrow_icon} alt="arrow icon" className="h-4" />
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
