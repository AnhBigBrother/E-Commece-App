import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FaStoreAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { PiShoppingCartFill } from "react-icons/pi";
import { FaTags } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderItem = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className='w-full flex flex-col gap-3 cursor-pointer'
      onClick={() => navigate(`/products/${product._id}`)}>
      <img
        className='rounded-md aspect-video object-cover'
        src={product.imageUrl}></img>
      <div className='grid grid-cols-9 gap-10'>
        <div className='col-span-5 flex flex-col'>
          <h1 className='text-lg font-bold'>{product.name}</h1>
          <h1 className='font-bold'> &#36;{product.price}</h1>
          <br />
          <p className='line-clamp-3'>{product.description}</p>
        </div>
        <div className='col-span-4 grid grid-cols-2 gap-3'>
          <div>
            <div className='flex flex-row gap-2 items-center font-semibold'>
              <FaStoreAlt className='h-5 w-auto' />
              <span>Brand:</span>
            </div>
            <p>{product.brand}</p>
          </div>
          <div>
            <div className='flex flex-row gap-2 items-center font-semibold'>
              <FaTags className='h-5 w-auto' />
              <span>Categories:</span>
            </div>
            <p>{product.categories.join(",")}</p>
          </div>
          <div className='flex flex-row gap-2 items-center font-semibold'>
            <FaStar className='h-5 w-auto' />
            <span>Rating: {product.rating}</span>
          </div>
          <div className='flex flex-row gap-2 items-center font-semibold'>
            <MdRateReview className='h-5 w-auto' />
            <span>Review: {product.numReviews}</span>
          </div>
          <div className='flex flex-row gap-2 items-center font-semibold'>
            <MdSell className='h-5 w-auto' />
            <span>Sold: {product.sold}</span>
          </div>
          <div className='flex flex-row gap-2 items-center font-semibold'>
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
      className='w-[42rem] xl:w-[36rem] 2xl:w-[45rem]'>
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
