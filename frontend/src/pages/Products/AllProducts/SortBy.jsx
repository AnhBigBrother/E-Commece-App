import Select from 'react-select';

const options = [
  { label: 'Price', value: 'price' },
  { label: 'Best sellers', value: 'hot' },
  { label: 'Lastest', value: 'new' },
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
      placeholder='Select...'
      styles={{
        control: (base, state) => ({
          ...base,
          width: 'auto',
          minHeight: '42px',
          backgroundColor: '#525252',
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          boxShadow: 'none',
        }),
        option: (base, item) => {
          return {
            ...base,
            color: 'white',
            backgroundColor: item.isFocused ? '#ec4899' : '#525252',
            borderRadius: '10px',
            cursor: 'pointer',
          };
        },
        menu: base => {
          return {
            ...base,
            backgroundColor: '#525252',
            borderRadius: '10px',
            border: 'none',
          };
        },
        input: base => {
          return {
            ...base,
            color: 'white',
          };
        },
        placeholder: base => {
          return {
            ...base,
            color: 'white',
          };
        },
        singleValue: base => {
          return {
            ...base,
            color: 'white',
          };
        },
        dropdownIndicator: base => {
          return {
            ...base,
            cursor: 'pointer',
            color: 'white',
            '&:hover': { color: '#ec4899' },
          };
        },
        clearIndicator: base => {
          return {
            ...base,
            cursor: 'pointer',
            color: 'white',
            '&:hover': { color: '#ec4899' },
          };
        },
      }}
    />
  );
};

export default SortBy;
