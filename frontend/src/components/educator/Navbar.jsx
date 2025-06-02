import React, { useContext } from "react";
import { assets, dummyEducatorData } from "../../assets/assets";

import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Appcontext } from "../../context/AppContext";

const Navbar = () => {
  const educatorData = dummyEducatorData;

  const { user } = useContext(Appcontext);

  return (
    // this is the navbar for educator dashboard
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3">
      <Link to={"/"}>
        {" "}
        <img src={assets.logo} alt="logo" className="w-28 lg:w-32" />
      </Link>

      <div className="flex items-center gap-5 text-gray-500 relative">
        <p>Hii! {user ? user.name : "Developers"}</p>

        {user?.profilePic && (
          <div className="hidden md:block md:w-10 md:h-10 rounded-full overflow-hidden">
            <img
              src={user.profilePic}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
