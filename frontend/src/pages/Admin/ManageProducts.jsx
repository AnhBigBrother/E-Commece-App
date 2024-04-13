import { useState } from "react";
import axios from "../../api/axios.js";
import InfiniteScroll from "react-infinite-scroller";
import useInfiniteScroll from "../../hooks/useInfiniteScroll.jsx";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader.jsx";
import { toast } from "react-toastify";
import { Skeleton4, Skeleton4Item } from "../../components/Skeleton.jsx";

const ProductItem = ({ data }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleDeleteProduct = () => {
    if (isLoading) {
      return;
    }
    if (confirm("Are you sure want to delete this product?")) {
      setIsLoading(true);
      axios
        .delete(`/admin/products/${data._id}`)
        .then(res => {
          console.log(res);
          setIsLoading(false);
          window.location.reload();
          toast.success("Product deleted successfuly");
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
          window.location.reload();
          toast.error("Something wrong, try later");
        });
    }
  };
  return (
    <div className='flex flex-row gap-3 bg-neutral-800 rounded-md p-3 cursor-pointer'>
      <img
        className='rounded-md h-40 aspect-square object-cover'
        src={data.imageUrl}></img>
      <div className='flex flex-col gap-2 flex-grow'>
        <p className='text-lg font-semibold text-ellipsis line-clamp-1'>
          {data.name}
        </p>
        <p className='text-ellipsis line-clamp-2 h-[3rem]'>
          {data.description}
        </p>
        <p className='text-xl font-semibold'>&#36;&#32;{data.price}</p>
        <div className='flex flex-row gap-3 justify-start'>
          <button
            className='px-2 py-1 bg-pink-500 hover:bg-pink-700 rounded-md'
            onClick={() => navigate(`${data._id}`)}>
            Update
          </button>
          <button
            className='px-2 py-1 bg-pink-500 hover:bg-pink-700 rounded-md'
            onClick={() => handleDeleteProduct()}>
            {isLoading ? <Loader /> : <span>Delete</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageProducts = () => {
  const [data, hasMore, fetchData] = useInfiniteScroll("/admin/products");
  return (
    <InfiniteScroll
      className='grid grid-cols-1 md:grid-cols-2 gap-3 py-[3rem]'
      pageStart={0}
      loadMore={fetchData}
      hasMore={hasMore}
      useWindow={false}
      loader={<Skeleton4Item key='loader' />}>
      {data.length === 0 ? (
        <Skeleton4 />
      ) : (
        data.map(item => (
          <ProductItem
            key={`item#${item._id}`}
            data={item}
          />
        ))
      )}
    </InfiniteScroll>
  );
};

export default ManageProducts;
