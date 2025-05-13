import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data || "");

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input);
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className="max-w-xl w-full h-12 md:h-14 flex items-center bg-white border border-gray-300 rounded-full shadow-md overflow-hidden"
    >
      <div className="px-3 flex items-center">
        <img
          src={assets.search_icon}
          alt="search icon"
          className="w-6 h-6 opacity-60"
        />
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Search for courses"
        className="flex-grow h-full px-2 text-gray-700 placeholder-gray-400 focus:outline-none"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base px-6 md:px-8 py-2 rounded-full transition-all duration-200 mr-2"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
