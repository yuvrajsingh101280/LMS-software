import React, { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa"; // filled star
const Rating = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating || 0);
  const handleRating = (value) => {
    setRating(value);
    if (onRate) {
      onRate(value);
    }
  };

  useEffect(() => {
    if (initialRating) {
      setRating(initialRating);
    }
  }, [initialRating]);

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;
        return (
          <span
            key={index}
            className={`text-xl sm:text-2xl cursor-pointer transition-colors ${
              starValue <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => handleRating(starValue)}
          >
            {isFilled ? <FaStar /> : <CiStar />}
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
