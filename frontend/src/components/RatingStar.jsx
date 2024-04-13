import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { memo } from "react";

const RatingStar = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);
  console.log("hello");
  return (
    <div className='w-auto h-auto flex flex-row px-1 rounded-md gap-1'>
      <div
        className='w-6 h-6 cursor-pointer'
        onMouseEnter={() => setHoverRating(0.5)}
        onMouseLeave={() => setHoverRating(0)}
        onClick={() => setRating(0)}></div>
      {[...Array(5).fill(0)].map((e, i) => {
        const currentRating = i + 1;
        return (
          <div key={`star#${currentRating}`}>
            {currentRating <= (hoverRating || rating) ? (
              <FaStar
                className='h-6 w-auto cursor-pointer'
                onMouseEnter={() => setHoverRating(currentRating)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(currentRating)}
              />
            ) : (
              <FaRegStar
                className='h-6 w-auto cursor-pointer'
                onMouseEnter={() => setHoverRating(currentRating)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(currentRating)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default memo(RatingStar);
