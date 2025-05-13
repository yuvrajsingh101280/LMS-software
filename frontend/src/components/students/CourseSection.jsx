import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Appcontext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CourseSection = () => {
  const { allCourses } = useContext(Appcontext);

  return (
    <div className="py-16 md:px-36 px-6 bg-[#f8fafc]">
      <h2 className="text-3xl font-bold text-gray-800">Learn from the best</h2>
      <p className="text-sm md:text-base text-gray-600 mt-2">
        Discover our top-rated courses across various categories. From coding,
        design, and business to wellness – crafted to deliver real results.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] px-2 md:px-0 md:my-16 my-10 gap-6">
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/course-list"
          onClick={() => scrollTo(0, 0)}
          className="text-white bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full transition duration-200"
        >
          Show All Courses
        </Link>
      </div>
    </div>
  );
};

export default CourseSection;
