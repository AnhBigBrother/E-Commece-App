import { useState, memo } from "react";
import { GiCheckMark } from "react-icons/gi";

const CategoryCheckBox = ({ category, setSelectedCategories }) => {
  const [checked, setChecked] = useState(false);
  const handleClickItem = () => {
    if (checked === false) {
      setSelectedCategories(pre => [...pre, category.name]);
    } else {
      setSelectedCategories(pre => pre.filter(e => e !== category.name));
    }
    setChecked(pre => !pre);
  };
  return (
    <div
      className='flex flex-row gap-2 items-center cursor-pointer'
      onClick={() => handleClickItem()}>
      <div className='w-5 h-5 bg-neutral-600 rounded-md relative'>
        {checked && (
          <GiCheckMark className='absolute bottom-0 left-0 w-6 h-6 rounded-md fill-pink-500' />
        )}
      </div>
      <p>{category.name}</p>
    </div>
  );
};

export default memo(CategoryCheckBox);
