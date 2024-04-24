import { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from '../../../api/axios';
import updateCart from '../../../redux/actions/updateCart';
import { FiMinus } from 'react-icons/fi';
import { FiPlus } from 'react-icons/fi';
import { FaRegTrashCan } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa6';
import ButtonLoader from '../../../components/ButtonLoader';

const CartItem = memo(({ data, calculatePrice, addItem, updateItemQty, removeItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [visible, setVisible] = useState(true);
  const [wasChecked, setWasChecked] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const handleMinus = () => {
    if (count <= 1) return;
    if (wasChecked) calculatePrice(-data.price);
    updateItemQty(data._id, -1);
    setCount(pre => pre - 1);
  };
  const handlePlus = () => {
    if (count === data.quantity - data.sold) return;
    if (wasChecked) calculatePrice(data.price);
    setCount(pre => pre + 1);
    updateItemQty(data._id, 1);
  };
  const handleRemoveFromCart = () => {
    if (isRemoving) return;
    setIsRemoving(true);
    axios
      .patch('user/cart', { id: data._id })
      .then(res => {
        const cartArr = res.data.results;
        const newCart = {};
        cartArr.forEach(e => (newCart[e] = true));
        dispatch(updateCart(newCart));
        if (wasChecked) {
          removeItem(data);
          calculatePrice(-data.price * count);
        }
        toast.success('Item removed');
        setIsRemoving(false);
        setVisible(false);
      })
      .catch(err => {
        console.error(err);
        setIsRemoving(false);
        toast.error(err.response.data.error || 'Something wrong, try later');
      });
  };
  const handleChooseItems = () => {
    if (!wasChecked) {
      addItem(data);
      calculatePrice(data.price * count);
      setWasChecked(true);
    } else {
      removeItem(data);
      calculatePrice(-data.price * count);
      setWasChecked(false);
    }
  };
  return visible ? (
    <div className='grid grid-cols-10 gap-1'>
      <div className='col-span-6 flex flex-row gap-2'>
        <button
          className='w-6 h-6 flex-shrink-0 mr-5 rounded-md bg-neutral-300 dark:bg-neutral-600 self-center'
          onClick={handleChooseItems}>
          {wasChecked && <FaCheck className='w-6 h-6 fill-white p-[3px] bg-rose-500 rounded-md' />}
        </button>
        <img
          className='h-20 aspect-video object-cover rounded-md cursor-pointer'
          src={data.imageUrl}
          onClick={() => navigate(`/products/${data._id}`)}></img>
        <div className='flex-grow flex flex-col gap-3'>
          <p className='text-xl font-semibold line-clamp-2'>{data.name}</p>
          <p className='w-full text-sm font-light line-clamp-2'>{data.description}</p>
        </div>
      </div>
      <div className='col-span-4 grid grid-cols-7 justify-items-center gap-1'>
        <p className='col-span-2 w-full text-center text-lg font-semibold'>&#36;{data.price}</p>
        <div className='col-span-2 flex flex-col items-center gap-1'>
          <div className='flex flex-row justify-center items-center gap-3'>
            <button onClick={handleMinus}>
              <FiMinus className='w-6 h-6' />
            </button>
            <p className='text-xl select-none'>{count}</p>
            <button onClick={handlePlus}>
              <FiPlus className='w-6 h-6' />
            </button>
          </div>
          <p className='text-sm text-center italic text-yellow-500'>Remain {data.quantity - data.sold} products</p>
        </div>
        <p className='col-span-2 w-full text-center text-lg font-semibold text-rose-500'>&#36;{count * data.price}</p>
        {isRemoving ? (
          <ButtonLoader />
        ) : (
          <FaRegTrashCan
            className='p-2 w-9 h-auto fill-white rounded-md bg-red-500 hover:bg-red-700 cursor-pointer'
            onClick={handleRemoveFromCart}
          />
        )}
      </div>
    </div>
  ) : null;
});

export default CartItem;
