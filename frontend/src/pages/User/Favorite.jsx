import useFetch from '../../hooks/useFetch';
import ProductCard from '../../components/ProductCard';
import { CardSkeleton } from '../../components/Skeleton';

const Favorite = () => {
  const [isLoading, data] = useFetch('/user/favorite');

  return (
    <div className='w-full py-[3rem] flex flex-col gap-5'>
      <p className='text-3xl text-center'>Favorited products</p>
      {data.length === 0 && !isLoading && <p>You haven't liked any product yet</p>}
      <div className='w-full justify-center flex flex-wrap gap-[0.5rem] lg:gap-[1.5rem] 2xl:gap-[3rem]'>
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          data.map(e => (
            <ProductCard
              data={e}
              key={e._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Favorite;
