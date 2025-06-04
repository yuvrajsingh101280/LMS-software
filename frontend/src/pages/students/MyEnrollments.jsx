import React, { useContext, useEffect, useState } from "react";
import { Appcontext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/students/Footer";
import toast from "react-hot-toast";
import axios from "axios";
const MyEnrollments = () => {
  const {
    enrolledCourses,
    calculateCourseDuration,
    navigate,
    user,
    fetchUserEnrolledCourses,
    calculateNoOfLectures,
    backendUrl,
  } = useContext(Appcontext);
  const [progressAraay, setProgressArray] = useState([]);
  const getCourseProgress = async () => {
    try {
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            `http://localhost:8000/api/user/get-course-progress`,
            { courseId: course._id },
            { withCredentials: true }
          );
          let totalLectures = calculateNoOfLectures(course);
          const lectureCompleted = data.progressData
            ? data.progressData.lectureCompleted.length
            : 0;
          return { totalLectures, lectureCompleted };
        })
      );
      setProgressArray(tempProgressArray);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (user) {
      fetchUserEnrolledCourses();
    }
  }, [user]);
  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseProgress();
    }
  }, [enrolledCourses]);
  return (
    <>
      <div className="md:px-36 px-8 pt-10">
        <h1 className="text-2xl font-semibold">My Enrollments</h1>
        <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
            <tr>
              <th className="px-4 py-3  font-semibold truncate">Course</th>
              <th className="px-4 py-3  font-semibold truncate">Duration</th>
              <th className="px-4 py-3  font-semibold truncate">Completed</th>
              <th className="px-4 py-3  font-semibold truncate">Status</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {enrolledCourses.map((course, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                  <img
                    src={course.courseThumbnail}
                    alt=""
                    className="w-14 sm:w-24 md:w-28"
                  />

                  <div className="flex-1">
                    <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
                    <Line
                      strokeWidth={2}
                      percent={
                        progressAraay[index]
                          ? (progressAraay[index].lectureCompleted * 100) /
                            progressAraay[index].totalLectures
                          : 0
                      }
                      className="bg-gray-300 rounded-full"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {calculateCourseDuration(course)}
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {progressAraay[index] &&
                    `${progressAraay[index].lectureCompleted}/${progressAraay[index].totalLectures}`}{" "}
                  <span>Lectures</span>
                </td>
                <td className="px-4 py-3 max-sm:text-right">
                  <button
                    onClick={() => navigate("/player/" + course._id)}
                    className="px-3 cursor-pointer sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white"
                  >
                    {progressAraay[index] &&
                    progressAraay[index].lectureCompleted /
                      progressAraay[index].totalLectures ===
                      1
                      ? "completed"
                      : "On Going"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;
