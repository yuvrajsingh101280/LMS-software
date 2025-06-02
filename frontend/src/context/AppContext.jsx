import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizedDuration from "humanize-duration";
import axios from "axios";
export const Appcontext = createContext();

export const AppContextPovider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isEducator, setIsEducator] = useState(false);
  const [allCourses, setAllCourse] = useState([]);

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  // fetch all courses
  const fetchAllCourses = async () => {
    setAllCourse(dummyCourses);
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
    return totalRating / course.courseRatings.length;
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
    setEnrolledCourses(dummyCourses);
  };

  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);
  // get the user if available
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user/data", {
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        setUser(res.data.user);
        setIsEducator(res.data.user?.role === "educator");
      } else {
        setUser(null);
        setIsEducator(false);
      }
    } catch (error) {
      setUser(null);
      setIsEducator(false);
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
  };
  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};
