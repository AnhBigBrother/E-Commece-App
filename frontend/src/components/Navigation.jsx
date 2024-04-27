import { useEffect, useRef, useState, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import updateUserProfile from '../redux/actions/updateUserProfile';
import updateCart from '../redux/actions/updateCart';
import updateFavorite from '../redux/actions/updateFavorite';

import { HiOutlineHome } from 'react-icons/hi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { LuUser } from 'react-icons/lu';
import { GoSearch } from 'react-icons/go';
import { FiShoppingCart } from 'react-icons/fi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdLogin } from 'react-icons/md';
import { FiUserPlus } from 'react-icons/fi';
import { FiUserCheck } from 'react-icons/fi';
import { LuCalendarClock } from 'react-icons/lu';
import { LuHeart } from 'react-icons/lu';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { MdLogout } from 'react-icons/md';
import { LuX } from 'react-icons/lu';
import { GrBarChart } from 'react-icons/gr';
import { LuPackagePlus } from 'react-icons/lu';
import { RiListSettingsLine } from 'react-icons/ri';
import { MdPeopleOutline } from 'react-icons/md';

const Navigation = () => {
  const user = useSelector(store => store.user);
  const cart = useSelector(store => store.cart);
  const favorite = useSelector(store => store.favorite);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usermenu = useRef();
  const userArea = useRef();
  const adminMenu = useRef();
  const adminArea = useRef();
  const [navBtnState, setNavBtnState] = useState('home');
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    if (searchInput !== '') {
      navigate(`/products?search=${searchInput}`);
    }
  };
  const handleClearSearch = () => {
    setSearchInput('');
    if (location.pathname === '/products') {
      navigate('/products');
    }
  };
  const handleClickUser = () => {
    usermenu.current.classList.toggle('flex');
    usermenu.current.classList.toggle('hidden');
  };
  const handleClickAdmin = () => {
    adminMenu.current.classList.toggle('flex');
    adminMenu.current.classList.toggle('hidden');
  };
  const handleLogout = () => {
    axios
      .post('/user/logout')
      .then(res => {
        localStorage.removeItem('user');
        dispatch(updateUserProfile({}));
        dispatch(updateCart({}));
        dispatch(updateFavorite({}));
        toast.success('Loged out');
        navigate('/home');
      })
      .catch(err => {
        toast.error('Something wrong, try later!');
        console.error(err);
        navigate('/home');
      });
  };

  const handleClickOutsideUsermenu = e => {
    if (!userArea.current?.contains(e.target) && usermenu.current?.classList.contains('flex')) {
      usermenu.current?.classList.toggle('flex');
      usermenu.current?.classList.toggle('hidden');
    }
  };
  const handleClickOutsideAdminmenu = e => {
    if (!adminArea.current?.contains(e.target) && adminMenu.current?.classList.contains('flex')) {
      adminMenu.current?.classList.toggle('flex');
      adminMenu.current?.classList.toggle('hidden');
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutsideUsermenu);
    document.addEventListener('click', handleClickOutsideAdminmenu);
    return () => {
      document.removeEventListener('click', handleClickOutsideUsermenu);
      document.removeEventListener('click', handleClickOutsideAdminmenu);
    };
  }, []);
  useEffect(() => {
    const x = location.pathname.split('/');
    setNavBtnState(x[1]);
  }, [location.pathname]);

  return (
    <header className='sticky w-max min-w-full h-auto top-0 left-0 bg-neutral-200 dark:bg-black flex justify-center items-center z-10'>
      <div className='relative w-full xl:w-4/5 h-auto p-3 xl:px-0 flex flex-row justify-between items-center'>
        <span
          className='text-logosm xl:text-logo text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-yellow-500 font-permanent cursor-pointer text-nowrap'
          onClick={() => navigate('/home')}>
          Shop_punk
        </span>
        <span className='flex flex-row items-center flex-grow mx-[3rem] h-10 border border-neutral-400 rounded-lg bg-neutral-100 dark:bg-neutral-800 border-none'>
          {<GoSearch className='mx-6 w-5 h-auto' />}
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            className='h-full flex-grow bg-inherit outline-none pr-8'
            placeholder='Search for products'></input>
          <div className='relative border-r w-0 h-3/5 border-neutral-500'>
            {searchInput && (
              <LuX
                className='absolute right-1 top-0 p-1 w-6 h-auto rounded-full bg-neutral-300 bg-opacity-60 cursor-pointer stroke-neutral-900 hover:stroke-rose-500 hover:bg-opacity-100'
                onClick={() => handleClearSearch()}
              />
            )}
          </div>
          <button
            className='px-4 h-full rounded-r-lg hover:text-rose-500'
            onClick={() => handleSearch()}>
            Search
          </button>
        </span>
        <span className='flex flex-row items-center gap-6 h-full'>
          <button
            className='flex flex-row gap-1 py-3 items-start h-full group'
            onClick={() => navigate('/home')}>
            <HiOutlineHome className={`${navBtnState === 'home' && 'stroke-rose-500'} w-6 h-auto group-hover:stroke-rose-500`} />
            <p className={`${navBtnState === 'home' && 'text-rose-500'} text-lg group-hover:text-rose-500`}>Home</p>
          </button>
          <button
            className='flex flex-row gap-1 py-3 items-start h-full group'
            onClick={() => navigate('/products')}>
            <HiOutlineShoppingBag className={`${navBtnState === 'products' && 'stroke-rose-500'} w-6 h-auto group-hover:stroke-rose-500`} />
            <p className={`${navBtnState === 'products' && 'text-rose-500'} text-lg group-hover:text-rose-500`}>Shop</p>
          </button>
          <button
            ref={userArea}
            className='flex flex-row gap-1 py-3 items-start h-full group relative'
            onClick={() => handleClickUser()}>
            <LuUser className={`${(navBtnState === 'user' || navBtnState === 'auth') && 'stroke-rose-500'} w-6 h-auto group-hover:stroke-rose-500`} />
            {Object.keys(cart).length + Object.keys(favorite).length > 0 && (
              <p className='absolute left-3 top-1 w-5 h-5 aspect-square p-[2px] text-center text-xs rounded-full bg-red-500'>{Object.keys(cart).length + Object.keys(favorite).length}</p>
            )}
            <p className={`${navBtnState === 'user' && 'text-rose-500'} text-lg group-hover:text-rose-500 max-w-24 whitespace-nowrap truncate`}>{user?.username}</p>
            <div
              ref={usermenu}
              className='absolute top-14 right-0 w-auto hidden flex-col items-start bg-neutral-300 dark:bg-neutral-700  rounded-md'>
              <div className='w-3 h-3 bg-inherit rotate-45 absolute right-8 top-0 -translate-y-1/2'></div>
              {Object.keys(user).length === 0 && (
                <p
                  className='pl-3 pr-10 py-2 w-full text-start text-nowrap hover:text-rose-500 flex flex-row gap-4'
                  onClick={() => navigate('/auth/login')}>
                  <MdLogin className='h-5 w-auto' /> <span>Log in</span>
                </p>
              )}
              {Object.keys(user).length === 0 && (
                <p
                  className='pl-3 pr-10 py-2 w-full text-start text-nowrap hover:text-rose-500 flex flex-row gap-4'
                  onClick={() => navigate('/auth/signup')}>
                  <FiUserPlus className='h-5 w-auto' /> <span>Sign up</span>
                </p>
              )}
              {user.isAdmin && (
                <p
                  className='pl-3 pr-10 py-2 w-full text-start text-nowrap hover:text-rose-500 flex flex-row gap-4'
                  onClick={() => navigate('/admin/statistical')}>
                  <MdOutlineAdminPanelSettings className='h-5 w-auto' />
                  <span>Admin</span>
                </p>
              )}
              {Object.keys(user).length !== 0 && (
                <p
                  className='pl-3 pr-10 py-2 w-full text-start text-nowrap hover:text-rose-500 flex flex-row gap-4'
                  onClick={() => navigate('/user/profile')}>
                  <FiUserCheck className='h-5 w-auto' /> <span>Profile</span>
                </p>
              )}
              {Object.keys(user).length !== 0 && (
                <div
                  className='relative pl-3 pr-10 py-2 w-full text-start text-nowrap hover:text-rose-500 flex flex-row gap-4'
                  onClick={() => navigate('/user/cart')}>
                  {Object.keys(cart).length !== 0 && <p className='absolute left-6 top-0 w-4 h-4 text-center text-xs rounded-full text-black dark:text-white bg-red-500'>{Object.keys(cart).length}</p>}
                  <FiShoppingCart className='h-5 w-auto' />
                  <span>Cart</span>
                </div>
              )}
              {Object.keys(user).length !== 0 && (
                <div
                  className='relative pl-3 pr-10 py-2 w-full text-start text-nowrap hover:text-rose-500 flex flex-row gap-4'
                  onClick={() => navigate('/user/favorite')}>
                  {Object.keys(favorite).length !== 0 && <p className='absolute left-6 top-0 w-4 h-4 text-center text-xs rounded-full text-black dark:text-white bg-red-500'>{Object.keys(favorite).length}</p>}
                  <LuHeart className='h-5 w-auto' />
                  <span>Favorite</span>
                </div>
              )}
              {Object.keys(user).length !== 0 && (
                <p
                  className='pl-3 pr-10 py-2 w-full text-start text-nowrap hover:text-rose-500 flex flex-row gap-4'
                  onClick={() => navigate('/user/ordered')}>
                  <LuCalendarClock className='h-5 w-auto' /> <span>Ordered</span>
                </p>
              )}
              {Object.keys(user).length !== 0 && (
                <p
                  className='pl-3 pr-10 py-2 w-full text-start text-nowrap hover:text-rose-500 flex flex-row gap-4'
                  onClick={() => handleLogout()}>
                  <MdLogout className='h-5 w-auto' /> <span>Log out</span>
                </p>
              )}
            </div>
          </button>
        </span>
        {user.isAdmin && (
          <button
            ref={adminArea}
            title='Admin role'
            onClick={() => handleClickAdmin()}
            className='absolute z-10 top-full translate-y-4 right-0 xl:left-full -translate-x-1 xl:translate-x-4 bg-neutral-300 dark:bg-neutral-700 p-2 rounded-md w-fit group'>
            <LuLayoutDashboard className='w-6 h-auto stroke-neutral-800 dark:stroke-neutral-200 group-hover:stroke-rose-500' />
            <div
              ref={adminMenu}
              className='absolute top-full translate-y-4 right-0 rounded-lg hidden flex-col items-start bg-neutral-300 dark:bg-neutral-700'>
              <div className='w-3 h-3 bg-inherit rotate-45 absolute right-5 top-0 -translate-y-1/2'></div>
              <p
                className='pl-3 pr-6 py-2 w-full hover:text-rose-500 text-nowrap text-start flex flex-row gap-3'
                onClick={() => navigate('/admin/statistical')}>
                <GrBarChart className='w-5 h-auto' />
                <span>Statistical</span>
              </p>
              <p
                className='pl-3 pr-6 py-2 w-full hover:text-rose-500 text-nowrap text-start flex flex-row gap-3'
                onClick={() => navigate('/admin/products/create')}>
                <LuPackagePlus className='w-5 h-auto' />
                <span>Create product</span>
              </p>
              <p
                className='pl-3 pr-6 py-2 w-full hover:text-rose-500 text-nowrap text-start flex flex-row gap-3'
                onClick={() => navigate('/admin/products')}>
                <RiListSettingsLine className='w-5 h-auto' />
                <span>Manage products</span>
              </p>
              <p
                className='pl-3 pr-6 py-2 w-full hover:text-rose-500 text-nowrap text-start flex flex-row gap-3'
                onClick={() => navigate('/admin/orders')}>
                <LuCalendarClock className='w-5 h-auto' />
                <span>Manage orders</span>
              </p>
              <p
                className='pl-3 pr-6 py-2 w-full hover:text-rose-500 text-nowrap text-start flex flex-row gap-3'
                onClick={() => navigate('/admin/users')}>
                <MdPeopleOutline className='w-5 h-auto' />
                <span>Manage users</span>
              </p>
            </div>
          </button>
        )}
      </div>
    </header>
  );
};

export default memo(Navigation);
