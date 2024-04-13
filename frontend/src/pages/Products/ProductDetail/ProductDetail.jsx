import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Review from "./Review.jsx";
import { toast } from "react-toastify";
import { Skeleton3 } from "../../../components/Skeleton";
import { FaStoreAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { PiShoppingCartFill } from "react-icons/pi";
import { FaTags } from "react-icons/fa6";

const ProductDetail = () => {
  const { id } = useParams();
  console.log(id);
  const [isLoading, data] = useFetch(`/products/${id}`);
  console.log(data);
  console.log(typeof data.categories);
  return (
    <>
      {isLoading ? (
        <Skeleton3 />
      ) : (
        <div className='py-[3rem] grid grid-cols-2 gap-[2rem]'>
          <div className='w-full flex flex-col gap-[1rem]'>
            <img
              src={data.imageUrl}
              className='rounded-lg w-full aspect-video object-cover'></img>
            <div className='flex flex-col gap-3 flex-grow'>
              <p className='text-3xl font-extrabold'>&#36;{data.price}</p>
              <div className='grid grid-cols-2 gap-3'>
                <div className='flex flex-row gap-2 items-center'>
                  <FaStoreAlt className='h-5 w-auto' />
                  <span>Brand:</span>
                  <p>{data.brand}</p>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                  <FaTags className='h-5 w-auto' />
                  <span>Categories:</span>
                  <p>{data.categories}</p>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                  <MdSell className='h-5 w-auto' />
                  <span>Sold: {data.sold}</span>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                  <PiShoppingCartFill className='h-5 w-auto' />
                  <span>Quantity: {data.quantity}</span>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                  <FaStar className='h-5 w-auto' />
                  <span>Rating: {data.rating}/5</span>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                  <MdRateReview className='h-5 w-auto' />
                  <span>Review: {data.numReviews}</span>
                </div>
              </div>
              <button className='rounded-md py-2 px-3 bg-pink-500 hover:bg-pink-700 w-fit'>
                Add to cart
              </button>
            </div>
          </div>
          <div className='flex-grow flex flex-col gap-3 w-full'>
            <div className='flex flex-col'>
              <p className='w-full text-xl font-bold'>{data.name}</p>
              <p className='w-full italic text-neutral-600'>
                Create at: {new Date(data.createdAt).toDateString()}
              </p>
            </div>
            <p>{data.description}</p>
            <Review />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
