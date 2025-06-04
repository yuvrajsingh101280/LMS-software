import React, { useContext, useEffect, useState } from "react";
import { Appcontext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/students/Footer";
import Rating from "../../components/students/Rating";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../components/students/Loading";

const Player = () => {
  const {
    enrolledCourses,
    calculateChapterTime,
    backendUrl,
    user,
    fetchUserEnrolledCourses,
  } = useContext(Appcontext);
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);

  const getCourseData = () => {
    const course = enrolledCourses.find((course) => course._id === courseId);
    console.log(course);
    if (course) {
      setCourseData(course);

      course.courseRatings.map((item) => {
        if (item.userId === user._id) {
          setInitialRating(item.rating);
        }
      });
    }
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData();
    }
  }, [enrolledCourses, courseId]);
  const markLectureAsCompleted = async (lectureId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/user/update-course-progress",
        { courseId, lectureId },
        {
          withCredetials: true,
        }
      );

      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getCourseProgress = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/user/get-course-progress`,
        { courseId },
        { withCredentials: true }
      );
      if (data.success) {
        setProgressData(data.progressData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const handleRate = async (rating) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/user/add-rating",
        { courseId, rating },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        fetchUserEnrolledCourses();
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCourseProgress();
  }, []);

  return courseData ? (
    <>
      <div className="p-4 sm:p-10 md:grid md:grid-cols-2 gap-10 md:px-36">
        {/* left column */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold">Course Structure</h2>

          <div className="pt-5">
            {courseData &&
              courseData?.courseContent?.map((chapter, chapterIndex) => (
                <div
                  key={chapterIndex}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  {/* Chapter Title */}
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(chapterIndex)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform ${
                          openSections[chapterIndex] ? "rotate-180" : ""
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
                      openSections[chapterIndex] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, lectureIndex) => (
                        <li
                          key={lectureIndex}
                          className="flex items-start gap-2 py-1"
                        >
                          <img
                            src={
                              progressData &&
                              progressData.lectureCompleted.includes(
                                playerData.lectureId
                              )
                                ? assets.blue_tick_icon
                                : assets.play_icon
                            }
                            alt="play icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2 text-sm text-gray-500">
                              {lecture.lectureUrl && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      ...lecture,
                                      chapter: chapterIndex + 1,
                                      lecture: lectureIndex + 1,
                                    })
                                  }
                                  className="text-green-600 cursor-pointer font-medium"
                                >
                                  Watch
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

          <div className="flex items-center gap-2 py-3 mt-10">
            <h1 className="text-xl font-bold">Rate this Course:</h1>
            <Rating initialRating={initialRating} onRate={handleRate} />
          </div>
        </div>

        {/* right column */}
        <div className="md:mt-10">
          {playerData ? (
            <div>
              <YouTube
                videoId={playerData.lectureUrl.split("/").pop()}
                iframeClassName="w-full aspect-video"
              />
              <div className="flex  justify-between items-center mt-1 gap-20 ">
                <p>
                  {playerData.chapter}.{playerData.lecture}.
                  {playerData.lectureTitle}
                </p>
                <button
                  onClick={() => markLectureAsCompleted(playerData.lectureId)}
                  className="text-blue-600 cursor-pointer"
                >
                  {progressData &&
                  progressData.lectureCompleted.includes(playerData.lectureId)
                    ? "Completed"
                    : "Mark Complete"}
                </button>
              </div>
            </div>
          ) : (
            <img src={courseData ? courseData.courseThumbnail : ""} alt="" />
          )}
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Player;
