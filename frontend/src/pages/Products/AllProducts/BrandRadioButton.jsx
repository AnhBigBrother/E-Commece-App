import { memo } from 'react';

const BrandRadioButton = ({ brand, selectedBrand, setSelectedBrand }) => {
  const handleClickItem = () => {
    if (selectedBrand === brand) {
      setSelectedBrand('');
    } else {
      setSelectedBrand(brand);
    }
  };

  return (
    <div
      className='flex flex-row gap-2 items-center cursor-pointer'
      onClick={() => handleClickItem()}>
      <div className='w-5 h-5 bg-neutral-300 dark:bg-neutral-600 rounded-full relative'>
        {brand === selectedBrand && (
          <div className='rounded-full border border-rose-500 w-full h-full flex items-center justify-center'>
            <div className='rounded-full bg-rose-500 w-3 h-3'></div>
          </div>
        )}
      </div>
      <p>{brand}</p>
    </div>
  );
};

export default memo(BrandRadioButton);
