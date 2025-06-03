import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { Appcontext } from "../../context/AppContext";
import { SiSemanticscholar } from "react-icons/si";
import axios from "axios";
import { IoLogOut } from "react-icons/io5";
import toast from "react-hot-toast";
const Navbar = () => {
  const location = useLocation();
  const isCourseListPage = location.pathname.includes("/course-list");
  const { navigate, user, setUser, isEducator, setIsEducator, backendUrl } =
    useContext(Appcontext);

  // ✅ Handle Role Update
  const handleBecomeEducator = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/educator/update-role", {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsEducator(true);
        setUser(res.data.user); // ✅ Update user in context
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error updating role:", error.message);
    }
  };

  // ✅ Logout Function
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8000/api/auth/logout", null, {
        withCredentials: true,
      });
      setUser(null); // Clear user from context
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

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
                onClick={() =>
                  isEducator ? navigate("/educator/") : handleBecomeEducator()
                }
                className="cursor-pointer hover:text-indigo-600"
              >
                {isEducator ? "Educator Dashboard" : "Become Educator"}
              </button>
            </div>
            |
            <Link to={"/my-enrollments"} className="hover:text-indigo-600">
              My Enrollments
            </Link>
            |
            <button
              onClick={handleLogout}
              className="hover:text-red-600 cursor-pointer"
            >
              <IoLogOut className="w-5 h-5" />
            </button>
          </>
        )}

        {!user && (
          <button
            onClick={() => navigate("/signup")}
            className="bg-indigo-600 cursor-pointer text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-all duration-200"
          >
            Create Account
          </button>
        )}
      </div>
      {user?.profilePic && (
        <div className="hidden md:block md:w-10 md:h-10 rounded-full overflow-hidden">
          <img
            src={user.profilePic}
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Mobile View */}
      <div className="md:hidden flex items-center gap-2 sm:gap-4 text-gray-700 text-sm">
        {user && (
          <>
            <button
              onClick={() =>
                isEducator ? navigate("/educator") : handleBecomeEducator()
              }
              className="cursor-pointer"
            >
              {isEducator ? "Dashboard" : "Educator"}
            </button>
            <Link to={"/my-enrollments"}>Enrollments</Link>
            <button onClick={handleLogout}>
              {" "}
              <IoLogOut className="w-5 h-5" />
            </button>
          </>
        )}
        {!user && (
          <button onClick={() => navigate("/signup")}>
            <img src={assets.user_icon} alt="Sign In" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
