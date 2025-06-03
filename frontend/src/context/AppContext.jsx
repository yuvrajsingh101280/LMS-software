import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizedDuration from "humanize-duration";
import axios from "axios";
import { toast } from "react-hot-toast";
export const Appcontext = createContext();

export const AppContextPovider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState(null);
  const [isEducator, setIsEducator] = useState(false);
  const [allCourses, setAllCourse] = useState([]);

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch all courses
  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/course/all");
      if (data.success) {
        setAllCourse(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // function to calculate the average rating of course
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }

    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return Math.floor(totalRating / course.courseRatings.length);
  };
  // function to calculate course chapter time

  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizedDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // function to calculate the duration of the course

  // function to calculate the duration of the course
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizedDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // function to calculate number of lecture in the course

  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        //ensures whether the lecure is present in each chapter
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  // fetch user enrolled courses

  const fetchUserEnrolledCourses = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/enrolled-courses",
        { withCredentials: true }
      );
      if (data.success) {
        setEnrolledCourses(data.enrolledCourses.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);
  // get the user if available
  const fetchUser = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/user/data", {
        withCredentials: true,
      });

      if (res.data.success) {
        setUser(res.data.user);
        setIsEducator(res.data.user?.role === "educator");
      } else {
        toast.error(res.data.error);
        setUser(null);
        setIsEducator(false);
      }
    } catch (error) {
      setUser(null);
      setIsEducator(false);
      toast.error(error.message);
      console.error("Error fetching user profile:", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    user,
    setUser,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
    fetchUserEnrolledCourses,
    loading,
    setLoading,
    fetchUser,
    backendUrl,
  };
  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};
