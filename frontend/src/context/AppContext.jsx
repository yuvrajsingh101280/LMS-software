import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
export const Appcontext = createContext();

export const AppContextPovider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [allCourses, setAllCourse] = useState([]);
  const value = { currency, allCourses, navigate };
  // fetch all courses
  const fetchAllCourses = async () => {
    setAllCourse(dummyCourses);
  };
  useEffect(() => {
    fetchAllCourses();
  }, []);

  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};
