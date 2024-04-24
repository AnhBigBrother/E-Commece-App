import { useState } from 'react';
import axios from '../../../api/axios.js';
import { toast } from 'react-toastify';
import RatingStar from '../../../components/RatingStar';
import { FaAngleDown } from 'react-icons/fa6';
import { FaAngleUp } from 'react-icons/fa6';
import { FaRegStar } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

const UserRated = ({ rated }) => {
  return (
    <div className='flex flex-row gap-1'>
      {new Array(5).fill(0).map((e, i) => {
        return i + 1 <= rated ? (
          <FaStar
            className='h-3 w-auto'
            key={`little#${i}`}
          />
        ) : (
          <FaRegStar
            className='h-3 w-auto'
            key={`little#${i}`}
          />
        );
      })}
    </div>
  );
};
const Review = ({ data, id }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviews, setReviews] = useState(data);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmitReview = () => {
    axios
      .patch(`/products/${id}`, {
        rating,
        comment,
      })
      .then(res => {
        setReviews(pre => [...pre, res.data]);
        toast.success('Your review has been added');
      })
      .catch(err => {
        console.error(err);
        toast.error(err.response.data.error || 'Something wrong, try later');
      });
  };
  return (
    <div className='flex flex-col gap-2 items-start w-full'>
      <div className='flex flex-col items-start justify-start w-full'>
        <button
          className='flex flex-row w-full justify-between py-2 items-center'
          onClick={() => setIsReviewOpen(pre => !pre)}>
          <span className='text-xl font-semibold'>Review</span>
          {!isReviewOpen ? <FaAngleDown className='h-5 w-auto' /> : <FaAngleUp className='h-5 w-auto' />}
        </button>
        <div className='w-full border-t'></div>
        {isReviewOpen && (
          <div className='w-full py-5 flex flex-col gap-5 justify-start items-start'>
            {reviews.map(e => (
              <div
                className='flex flex-col gap-1 justify-start items-start p-2 rounded-md bg-neutral-200 dark:bg-neutral-800 w-full'
                key={e._id}>
                <p className='font-bold'>{e.user.name}</p>
                <UserRated rated={e.rating} />
                <p className='font-light'>{e.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='flex flex-col items-start justify-start w-full'>
        <p className='py-2 text-xl font-semibold'>Write your review</p>
        <div className='w-full border-t'></div>
        <div className='pt-2 flex flex-row items-center'>
          <p className='text-xl font-semibold'>Rating:</p>
          <RatingStar
            rating={rating}
            setRating={setRating}
          />
        </div>
        <div className='flex flex-col gap-1 items-start w-full'>
          <p className='text-xl font-semibold'>Comment:</p>
          <textarea
            className='w-full bg-inherit border border-neutral-400 rounded-lg resize-none h-[10rem] p-2'
            value={comment}
            onChange={e => setComment(e.target.value)}></textarea>
        </div>
        <button
          className='w-fit px-3 py-2 bg-rose-500 hover:bg-rose-700 rounded-md mt-3'
          onClick={handleSubmitReview}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Review;
