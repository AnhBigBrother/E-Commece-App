import useFetch from '../../../hooks/useFetch';
import { useEffect, useState } from 'react';
import ProductCard from '../../../components/ProductCard';
import { CardSkeleton } from '../../../components/Skeleton';
import BrandRadioButton from './BrandRadioButton';
import CategoryCheckBox from './CategoryCheckBox';
import SortBy from './SortBy';

const AllProducts = () => {
  const [categoriesIsLoading, categories] = useFetch('/admin/categories');
  const [brandIsLoading, brands] = useFetch('/admin/brands');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [productsIsLoading, allProducts] = useFetch(`/products?categories=${selectedCategories.join(',')}&brand=${selectedBrand}&sort=${sortOrder}`);

  return (
    <div className='py-[3rem] flex flex-row gap-3 w-full'>
      <div className='p-5 rounded-lg flex flex-col gap-10 w-fit h-fit bg-neutral-800'>
        <div className='flex flex-col gap-3'>
          <p className='w-full rounded-full py-2 px-5 text-center bg-black text-nowrap'>Filter by categories</p>
          <div className='flex flex-col gap-1 px-4'>
            {categories.map(e => (
              <CategoryCheckBox key={`${e._id}-checkbox`} category={e} setSelectedCategories={setSelectedCategories} />
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <p className='w-full rounded-full py-2 px-5 text-center bg-black text-nowrap'>Filter by brand</p>
          <div className='flex flex-col gap-1 px-4'>
            {brands.map((e, i) => (
              <BrandRadioButton key={`checkbox-${i}`} brand={e} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <p className='w-full rounded-full py-2 px-5 text-center bg-black text-nowrap'>Sort products by</p>
          <SortBy setSortOrder={setSortOrder} />
        </div>
      </div>
      {productsIsLoading ? (
        <div className='flex flex-row flex-grow flex-wrap w-fit gap-5 items-start justify-center'>
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : (
        <div className='flex flex-row flex-grow flex-wrap w-fit gap-5 items-start justify-center'>
          {allProducts.map(e => (
            <ProductCard data={e} selectedCategories={selectedCategories} key={e._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
