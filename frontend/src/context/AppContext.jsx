import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizedDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react";
export const Appcontext = createContext();

export const AppContextPovider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();

  const [allCourses, setAllCourse] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

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
  const logToken = async () => {
    console.log(await getToken());
  };
  useEffect(() => {
    if (user) {
      logToken();
    }
  }, [user]);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,

    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    enrolledCourses,
    fetchUserEnrolledCourses,
  };
  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};
