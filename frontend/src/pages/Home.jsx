import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Skeleton1, Skeleton2 } from "../components/Skeleton";
import AutoPlaySlider from "../components/AutoPlaySlider";
import ProductCard from "../components/ProductCard";
import { FaArrowRight } from "react-icons/fa6";

const SpecialProductItem = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className='flex flex-col gap-1 w-[12rem] 2xl:w-[16rem] cursor-pointer'
      onClick={() => navigate(`/products/${data._id}`)}>
      <img
        className='w-full aspect-video object-cover rounded-md'
        src={data.imageUrl}></img>
      <div className='pt-2 flex flex-row gap-1 items-start justify-between'>
        <p className='font-bold text-lg'>{data.name}</p>
        <p className='font-semibold text-pink-400 px-2 py-[2px] rounded-full bg-neutral-700 w-fit opacity-75 h-fit'>
          &#36;{data.price}
        </p>
      </div>
    </div>
  );
};
const Home = () => {
  const navigate = useNavigate();
  const [specialIsLoading, specialProducts] = useFetch(
    "/products?type=special"
  );
  const [hotIsLoading, hotProducts] = useFetch("/products?type=hot");
  const [newIsLoading, newProducts] = useFetch("/products?type=new");

  return (
    <div className='flex flex-col gap-[5rem] justify-start items-center py-[3rem]'>
      {specialIsLoading ? (
        <Skeleton1 />
      ) : (
        <div className='flex flex-row justify-center xl:justify-between gap-[3rem]'>
          <div className='grid-cols-2 gap-[2rem] hidden xl:grid h-fit'>
            {specialProducts.map(
              (e, i) =>
                i < 4 && (
                  <SpecialProductItem
                    data={e}
                    key={`banner#${e._id}}`}
                  />
                )
            )}
          </div>
          <AutoPlaySlider data={specialProducts} />
        </div>
      )}
      {specialIsLoading ? (
        <Skeleton2 />
      ) : (
        <div className='flex-col flex gap-5'>
          <div className='w-full flex flex-row items-center justify-between'>
            <h1 className='text-3xl font-bold'>Special products</h1>
            <button
              className='py-2 px-5 rounded-full bg-pink-500 hover:bg-pink-700 flex flex-row gap-2 items-center'
              onClick={() => navigate("/products")}>
              <span className='font-semibold'>Shop now</span>
              <FaArrowRight />
            </button>
          </div>
          <div className='grid grid-cols-3 gap-[1rem] xl:gap-[3rem]'>
            {specialProducts.map(
              (e, i) =>
                i < 6 && (
                  <ProductCard
                    data={e}
                    key={e._id}
                  />
                )
            )}
          </div>
        </div>
      )}
      {hotIsLoading ? (
        <Skeleton2 />
      ) : (
        <div className='flex-col flex gap-5'>
          <div className='w-full flex flex-row items-center justify-between'>
            <h1 className='text-3xl font-bold'>Hot products</h1>
            <button
              className='py-2 px-5 rounded-full bg-pink-500 hover:bg-pink-700 flex flex-row gap-2 items-center'
              onClick={() => navigate("/products")}>
              <span className='font-semibold'>Shop now</span>
              <FaArrowRight />
            </button>
          </div>
          <div className='grid grid-cols-3 gap-[1rem] xl:gap-[3rem]'>
            {hotProducts.map(
              (e, i) =>
                i < 6 && (
                  <ProductCard
                    data={e}
                    key={e._id}
                  />
                )
            )}
          </div>
        </div>
      )}
      {newIsLoading ? (
        <Skeleton2 />
      ) : (
        <div className='flex-col flex gap-5'>
          <div className='w-full flex flex-row items-center justify-between'>
            <h1 className='text-3xl font-bold'>Newest</h1>
            <button
              className='py-2 px-5 rounded-full bg-pink-500 hover:bg-pink-700 flex flex-row gap-2 items-center'
              onClick={() => navigate("/products")}>
              <span className='font-semibold'>Shop now</span>
              <FaArrowRight />
            </button>
          </div>
          <div className='grid grid-cols-3 gap-[1rem] xl:gap-[3rem]'>
            {newProducts.map(
              (e, i) =>
                i < 6 && (
                  <ProductCard
                    data={e}
                    key={e._id}
                  />
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
