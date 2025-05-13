import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Appcontext } from "../../context/AppContext";
import { SiSemanticscholar } from "react-icons/si";
const Navbar = () => {
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { navigate, isEducator } = useContext(Appcontext);

  return (
    <div
      className={`flex items-center justify-between z-10 px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-300 py-4 ${
        isCourseListPage ? "bg-white" : "bg-blue-100"
      }`}
    >
      <Link to={"/"}>
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="Logo"
          className="w-28 lg:w-32 cursor-pointer"
        />
      </Link>

      {/* Desktop View */}
      <div className="hidden md:flex items-center gap-x-6 text-gray-700 font-medium">
        {user && (
          <>
            <div className="flex justify-center items-center gap-2">
              <SiSemanticscholar fill="black" size={20} />
              <button
                onClick={() => navigate("/educator")}
                className="cursor-pointer hover:text-indigo-600"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
            </div>
            |
            <Link to={"/my-enrollments"} className="hover:text-indigo-600">
              My Enrollments
            </Link>
          </>
        )}
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-indigo-600 cursor-pointer text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-all duration-200"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex items-center gap-2 sm:gap-4 text-gray-700 text-sm">
        {user && (
          <>
            <button
              onClick={() => navigate("/educator")}
              className="cursor-pointer"
            >
              {isEducator ? "Dashboard" : "Educator"}
            </button>
            <Link to={"/my-enrollments"}>Enrollments</Link>
          </>
        )}
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="Sign In" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
