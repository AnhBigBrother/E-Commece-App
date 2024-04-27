import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import updateCart from '../../../redux/actions/updateCart.js';
import useFetch from '../../../hooks/useFetch';
import Review from './Review.jsx';
import ButtonLoader from '../../../components/ButtonLoader.jsx';
import axios from '../../../api/axios.js';
import { Skeleton3 } from '../../../components/Skeleton';
import { FaStoreAlt } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { MdSell } from 'react-icons/md';
import { MdRateReview } from 'react-icons/md';
import { PiShoppingCartFill } from 'react-icons/pi';
import { FaTags } from 'react-icons/fa6';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [dataIsLoading, data] = useFetch(`/products/${id}`);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const handleAddToCart = () => {
    if (isAddingToCart) return;
    setIsAddingToCart(true);
    axios
      .post('/user/cart', { id })
      .then(res => {
        const newCart = {};
        res.data.results.forEach(e => (newCart[e] = true));
        dispatch(updateCart(newCart));
        setIsAddingToCart(false);
        toast.success('Added to cart');
      })
      .catch(err => {
        console.error(err);
        setIsAddingToCart(false);
        toast.error(err.response.data.error || 'Something wrong, try later');
      });
  };
  return (
    <>
      {dataIsLoading ? (
        <Skeleton3 />
      ) : (
        <div className='py-[3rem] flex flex-col gap-[2rem]'>
          <div className='w-full grid grid-cols-2 gap-[1rem]'>
            <img
              src={data.imageUrl}
              className='rounded-lg w-full aspect-video object-cover'></img>
            <div className='flex flex-col gap-3 flex-grow'>
              <div className='flex flex-col'>
                <p className='w-full text-xl font-bold'>{data.name}</p>
                <p className='w-full italic text-neutral-600'>Create at: {new Date(data.createdAt).toDateString()}</p>
              </div>
              <div className='flex flex-row gap-1 items-center'>
                <p className='underline text-rose-500 font-semibold mr-1'>{`${data.rating}/5`}</p>
                {new Array(5).fill(0).map((e, i) => {
                  return i + 1 <= data.rating ? (
                    <FaStar
                      className='h-5 w-auto'
                      key={`little#${i}`}
                    />
                  ) : (
                    <FaRegStar
                      className='h-5 w-auto'
                      key={`little#${i}`}
                    />
                  );
                })}
              </div>
              <p className='text-3xl font-extrabold'>&#36;{data.price}</p>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-row gap-2 items-center'>
                  <FaTags className='h-5 w-auto' />
                  <span>Categories:</span>
                  <p>{data.category}</p>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                  <FaStoreAlt className='h-5 w-auto' />
                  <span>Brand:</span>
                  <p>{data.brand}</p>
                </div>
                <div className='flex flex-row gap-2 items-center'>
                  <MdSell className='h-5 w-auto' />
                  <span>Sold: {data.sold}</span>
                </div>
                <div className='flex flex-row gap-2 items-center italic'>
                  <PiShoppingCartFill className='h-5 w-auto' />
                  <span>Remaining {data.quantity - data.sold} products</span>
                </div>
              </div>
              <button
                className='rounded-md py-2 px-3 bg-rose-500 hover:bg-rose-700 w-fit'
                onClick={handleAddToCart}>
                {isAddingToCart ? <ButtonLoader /> : <span>Add to cart</span>}
              </button>
            </div>
          </div>
          <div className='flex-grow flex flex-col gap-3 w-full'>
            <div className='flex flex-col'>
              <p className='text-lg font-semibold'>Description</p>
              <p>{data.description}</p>
            </div>
            <Review
              data={data.reviews}
              id={id}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
