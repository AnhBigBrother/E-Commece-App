import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { memo } from 'react';

const RatingStar = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className='w-auto h-auto flex flex-row px-1 rounded-md'>
      <div
        className='w-3 h-7 p-[2px] cursor-pointer'
        onMouseEnter={() => setHoverRating(0.5)}
        onMouseLeave={() => setHoverRating(0)}
        onClick={() => setRating(0)}></div>
      {new Array(5).fill(0).map((e, i) => {
        const currentRating = i + 1;
        return (
          <div key={`star#${currentRating}`}>
            {currentRating <= (hoverRating || rating) ? (
              <FaStar
                className='w-7 h-7 p-[2px] cursor-pointer'
                onMouseEnter={() => setHoverRating(currentRating)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(currentRating)}
              />
            ) : (
              <FaRegStar
                className='w-7 h-7 p-[2px] cursor-pointer'
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
