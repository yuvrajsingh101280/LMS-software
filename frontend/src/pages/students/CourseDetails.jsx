import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Appcontext } from "../../context/AppContext";
import Loading from "../../components/students/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const { allCourses, calculateRating, calculateChapterTime } =
    useContext(Appcontext);

  // Fetch Course Data inside useEffect
  useEffect(() => {
    const fetchCourseData = async () => {
      const findCourse = allCourses.find((course) => course._id === id);
      setCourseData(findCourse || null);
    };

    fetchCourseData();
  }, [allCourses, id]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Show loading spinner if courseData is not loaded
  if (!courseData) return <Loading />;

  return (
    <div className="relative md:px-36 px-8 md:pt-30 pt-20">
      {/* Background Gradient (Fixed) */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-green-200 via-white to-white -z-10"></div>

      {/* Main Content */}
      <div className="flex md:flex-row flex-col-reverse gap-10 items-start justify-between relative">
        {/* Left Column */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{courseData?.courseTitle}</h1>

          <p
            className="mt-4 text-gray-700 md:text-base text-small"
            dangerouslySetInnerHTML={{
              __html: courseData?.courseDescription?.slice(0, 200) || "",
            }}
          ></p>

          {/* Review and Rating */}
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
                  alt="rating star"
                />
              ))}
            </div>
            <p className="text-blue-600">
              ({courseData?.courseRatings?.length || 0}{" "}
              {courseData?.courseRatings?.length > 1 ? "ratings" : "rating"})
            </p>
            <p>
              {courseData?.enrolledStudents?.length || 0}{" "}
              {courseData?.enrolledStudents?.length > 1
                ? "students"
                : "student"}
            </p>
          </div>

          <p className="text-sm">
            Course by <span className="text-blue-600">Yuvraj Singh</span>
          </p>

          {/* Course Structure */}
          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>

            <div className="pt-5">
              {courseData?.courseContent?.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  {/* Chapter Title */}
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none "
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="arrow icon"
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-default">
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  {/* Lectures List */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }  `}
                  >
                    <ul className="list-disc  md:pl-10  pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 py-1 "
                        >
                          <img
                            src={assets.play_icon}
                            alt="play icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className=" flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className=" flex gap-2 text-sm text-gray-500">
                              {lecture.isPreviewFree && (
                                <p className="text-green-600 cursor-pointer font-medium">
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  {
                                    units: ["h", "m"],
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-20 text-sm md:text-default">
            <h3 className="text-xl font-semibold text-gray-800">
              Coruse Description
            </h3>
            <p
              className="pt-3 rich-text"
              dangerouslySetInnerHTML={{
                __html: courseData?.courseDescription || "",
              }}
            ></p>
          </div>
        </div>

        {/* Right Column (Empty for Now) */}
        <div className="flex-1">
          {/* Add right-side content here if needed */}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
