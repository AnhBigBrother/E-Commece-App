import { useNavigate } from "react-router-dom";
import { LiaCartPlusSolid } from "react-icons/lia";
import { FaArrowRight } from "react-icons/fa6";

const ProductCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col bg-neutral-800 rounded-md items-start w-[20rem] xl:w-[24rem] h-fit'>
      <img
        className='aspect-video w-full object-cover rounded-t-md'
        src={data.imageUrl}></img>
      <div className='flex flex-col p-3 w-full'>
        <div className='flex flex-row gap-2 items-start justify-between'>
          <p className='text-lg font-semibold line-clamp-2'>{data.name}</p>
          <p className='text-lg font-semibold text-pink-500'>
            &#36;{data.price}
          </p>
        </div>
        <p className='line-clamp-2 mb-2'>{data.description}</p>
        <div className='flex flex-row items-center justify-between'>
          <button
            className='px-3 py-2 rounded-md bg-pink-500 hover:bg-pink-700 flex flex-row items-center gap-2'
            onClick={() => navigate(`/products/${data._id}`)}>
            <span>Read more</span>
            <FaArrowRight />
          </button>
          <LiaCartPlusSolid className='h-7 w-auto cursor-pointer hover:fill-pink-500' />
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
