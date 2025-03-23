import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
const Navbar = () => {
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk(); //open signin modal

  const { user } = useUser();

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? "bg-white" : "bg-green-200"
      }`}
    >
      <Link to={"/"}>
        <img
          src={assets.logo}
          alt="Logo"
          className="w-28  lg:w-32 cursor-pointer"
        />
      </Link>
      {/* desktop view */}
      <div className="hidden md:flex items-center gap-5 text-grey-500">
        <div className="flex items-center gap-5">
          {/* if the user is logged in then we will show these buttons */}
          {user && (
            <>
              <button className="cursor-pointer">Become Educator</button> |
              <Link to={"/my-enrollments"}>My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>
      {/* mobile view */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button className="cursor-pointer">Become Educator</button> |
              <Link to={"/my-enrollments"}>My Enrollments</Link>
            </>
          )}
        </div>

        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
