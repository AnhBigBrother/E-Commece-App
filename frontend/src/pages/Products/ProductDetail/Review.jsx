import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import RatingStar from "../../../components/RatingStar";

const Review = ({ data }) => {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  useEffect(() => {
    console.log(rating);
    console.log(comment);
  }, [rating, comment]);
  return (
    <div className='flex flex-col gap-2 items-start w-full'>
      <div className='flex flex-col items-start justify-start w-full'>
        <button
          className='flex flex-row w-full justify-between py-2 items-center'
          onClick={() => setIsReviewOpen(pre => !pre)}>
          <span className='text-xl font-semibold'>Review</span>
          {!isReviewOpen ? (
            <FaAngleDown className='h-5 w-auto' />
          ) : (
            <FaAngleUp className='h-5 w-auto' />
          )}
        </button>
        <div className='w-full border-t'></div>
        {isReviewOpen && (
          <div className='w-full py-5 flex flex-col gap-5 justify-start items-start'>
            <div className='flex flex-col justify-start items-start'>
              <p className='font-semibold'>John Doe</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                fermentum dolor et gravida pulvinar. Phasellus cursus sapien
                aliquam ante posuere dignissim. Suspendisse quis pretium felis.
                Aenean porttitor mauris vel ornare fermentum. Sed sapien leo,
                porta vitae felis a, pellentesque auctor odio. Donec
                pellentesque interdum neque, non ultricies est elementum nec.
                Proin sed lacus non enim vestibulum viverra. Etiam lobortis
                porta libero non congue. Maecenas ultrices porttitor lorem,
                porta pulvinar tortor porttitor sed. Mauris ornare justo
                feugiat, semper felis vel, eleifend elit. Etiam quis est sed
                urna vehicula tincidunt ac at neque. Nunc eu fermentum justo.
                Fusce eu eleifend tellus. Etiam ac nunc lorem. Sed sed tortor
                sed metus convallis hendrerit.
              </p>
            </div>
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
        <button className='w-fit px-3 py-2 bg-pink-500 hover:bg-pink-700 rounded-md mt-3'>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Review;
