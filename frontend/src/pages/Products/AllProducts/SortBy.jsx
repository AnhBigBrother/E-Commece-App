import { memo } from 'react';
import Select from 'react-select';

const options = [
  { label: 'Best price', value: 'price' },
  { label: 'Best sellers', value: 'hot' },
  { label: 'Newest first', value: 'new' },
];
const SortBy = ({ setSortOrder }) => {
  const handleSelect = selectedItem => {
    if (selectedItem === null) {
      setSortOrder('');
    } else {
      setSortOrder(selectedItem.value);
    }
  };
  return (
    <Select
      name='Sort by'
      options={options}
      isClearable={true}
      onChange={handleSelect}
      placeholder='Sort by...'
      styles={{
        control: (base, state) => ({
          ...base,
          width: 'auto',
          minHeight: '42px',
          backgroundColor: 'var(--bg-element)',
          color: 'var(--main-text-color)',
          border: 'none',
          borderRadius: '16px',
          boxShadow: 'none',
        }),
        option: (base, item) => {
          return {
            ...base,
            color: 'var(--main-text-color)',
            backgroundColor: item.isFocused ? '#F43F5E' : 'var(--bg-element)',
            borderRadius: '10px',
            cursor: 'pointer',
          };
        },
        menu: base => {
          return {
            ...base,
            backgroundColor: 'var(--bg-element)',
            borderRadius: '10px',
            border: 'none',
          };
        },
        input: base => {
          return {
            ...base,
            color: 'var(--main-text-color)',
          };
        },
        placeholder: base => {
          return {
            ...base,
            color: 'var(--main-text-color)',
          };
        },
        singleValue: base => {
          return {
            ...base,
            color: 'var(--main-text-color)',
          };
        },
        dropdownIndicator: base => {
          return {
            ...base,
            cursor: 'pointer',
            color: 'var(--main-text-color)',
            '&:hover': { color: '#F43F5E' },
          };
        },
        clearIndicator: base => {
          return {
            ...base,
            cursor: 'pointer',
            color: 'var(--main-text-color)',
            '&:hover': { color: '#F43F5E' },
          };
        },
      }}
    />
  );
};

export default memo(SortBy);
