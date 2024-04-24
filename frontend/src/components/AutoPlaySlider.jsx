import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { FaStoreAlt } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { MdSell } from 'react-icons/md';
import { MdRateReview } from 'react-icons/md';
import { PiShoppingCartFill } from 'react-icons/pi';
import { FaTags } from 'react-icons/fa6';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderItem = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className='w-full flex flex-col gap-3 cursor-pointer'
      onClick={() => navigate(`/products/${product._id}`)}>
      <img
        className='rounded-md aspect-video object-cover'
        src={product.imageUrl}></img>
      <div className='grid grid-cols-2 gap-3'>
        <div className='col-span-1 flex flex-col'>
          <h1 className='text-lg font-bold'>{product.name}</h1>
          <h1 className='font-bold'> &#36;{product.price}</h1>
          <p className='line-clamp-3 text-sm font-light'>{product.description}</p>
        </div>
        <div className='col-span-1 grid grid-cols-2 gap-2 h-fit w-fit'>
          <div className='flex flex-row gap-1 items-center'>
            <div className='flex flex-row gap-2 items-center'>
              <FaStoreAlt className='h-5 w-auto' />
              <span>Brand:</span>
            </div>
            <p className='truncate'>{product.brand}</p>
          </div>
          <div className='flex flex-row gap-1 items-center'>
            <div className='flex flex-row gap-2 items-center'>
              <FaTags className='h-5 w-auto' />
              <span>Category:</span>
            </div>
            <p className='truncate'>{product.category}</p>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <FaStar className='h-5 w-auto' />
            <span>Rating: {product.rating}</span>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <MdRateReview className='h-5 w-auto' />
            <span>Review: {product.numReviews}</span>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <MdSell className='h-5 w-auto' />
            <span>Sold: {product.sold}</span>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <PiShoppingCartFill className='h-5 w-auto' />
            <span>Quantity: {product.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AutoPlaySlider = ({ data }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 900,
    autoplaySpeed: 3600,
  };
  return (
    <Slider
      {...settings}
      className='w-[36rem] xl:w-[40rem] mx-5'>
      {data.map(product => (
        <SliderItem
          key={product._id}
          product={product}
        />
      ))}
    </Slider>
  );
};

export default AutoPlaySlider;
