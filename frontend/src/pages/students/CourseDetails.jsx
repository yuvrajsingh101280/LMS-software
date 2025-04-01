import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Appcontext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import { assets } from "../../assets/assets";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const {
    allCourses,
    calculateRating,
    calculateCourseDuration,
    calculateNoOfLectures,
    calculateChapterTime,
  } = useContext(Appcontext);

  console.log(courseData);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourses, id]);

  return courseData ? (
    <div className="relative md:px-36 px-8 md:pt-30 pt-20">
      {/* Background Gradient (Fixed) */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-green-200 via-white to-white -z-10"></div>

      {/* Main Content */}
      <div className="flex md:flex-row flex-col-reverse gap-10 items-start justify-between relative">
        {/* Left Column */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{courseData.courseTitle}</h1>
          <p
            className="mt-4 text-gray-700 md:text-base text-small"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>
          {/* review and rating */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <img
                  className="w-3.5 h-3.5"
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt=""
                />
              ))}{" "}
            </div>{" "}
            <p className="text-blue-600 ">
              ({courseData.courseRatings.length}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
            </p>
            <p>
              {courseData.enrolledStudents.length}
              {courseData.enrolledStudents.length > 1 ? "students" : "student"}
            </p>
          </div>

          <p className="text-sm">
            course by <span className="text-blue-600">Yuvraj singh</span>
          </p>
          <div className="pt-8 text-gray-800"></div>
        </div>

        {/* Right Column (Empty for Now) */}
        <div className="flex-1">
          {/* Add right-side content here if needed */}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
