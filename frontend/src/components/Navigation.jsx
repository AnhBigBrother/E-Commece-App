import { useEffect, useRef, useState, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axios";
import { toast } from "react-toastify";
import updateUserProfile from "../redux/actions/updateUserProfile";

import { HiOutlineHome } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LuUser } from "react-icons/lu";
import { GoSearch } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLogin } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { FiUserCheck } from "react-icons/fi";
import { LuCalendarClock } from "react-icons/lu";
import { LuHeart } from "react-icons/lu";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdLogout } from "react-icons/md";

const Navigation = () => {
  const user = useSelector(store => store.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usermenu = useRef();
  const userArea = useRef();
  const adminMenu = useRef();
  const adminArea = useRef();
  const [navBtnState, setNavBtnState] = useState("home");
  const [searchInput, setSearchInput] = useState("");

  const handleClickUser = () => {
    usermenu.current.classList.toggle("flex");
    usermenu.current.classList.toggle("hidden");
  };
  const handleClickAdmin = () => {
    adminMenu.current.classList.toggle("flex");
    adminMenu.current.classList.toggle("hidden");
  };
  const handleLogout = () => {
    axios
      .post("/user/logout")
      .then(res => {
        toast.success("Loged out");
        localStorage.removeItem("user");
        dispatch(updateUserProfile({}));
        navigate("/home");
      })
      .catch(err => {
        toast.error("Something wrong, try later!");
        console.error(err);
        navigate("/home");
      });
  };

  useEffect(() => {
    const handleClickOutsideUsermenu = e => {
      if (
        !userArea.current?.contains(e.target) &&
        usermenu.current?.classList.contains("flex")
      ) {
        usermenu.current?.classList.toggle("flex");
        usermenu.current?.classList.toggle("hidden");
      }
    };
    const handleClickOutsideAdminmenu = e => {
      if (
        !adminArea.current?.contains(e.target) &&
        adminMenu.current?.classList.contains("flex")
      ) {
        adminMenu.current?.classList.toggle("flex");
        adminMenu.current?.classList.toggle("hidden");
      }
    };
    document.addEventListener("click", handleClickOutsideUsermenu);
    document.addEventListener("click", handleClickOutsideAdminmenu);
    return () => {
      document.removeEventListener("click", handleClickOutsideUsermenu);
      document.removeEventListener("click", handleClickOutsideAdminmenu);
    };
  }, []);
  useEffect(() => {
    const x = location.pathname.split("/");
    setNavBtnState(x[1]);
  }, [location.pathname]);

  return (
    <header className='fixed w-full h-auto top-0 bg-black flex justify-center items-center z-10'>
      <div className='relative w-full xl:w-4/5 h-auto p-3 xl:px-0 flex flex-row justify-between items-center'>
        <span
          className='text-logosm xl:text-logo text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 font-permanent cursor-pointer text-nowrap'
          onClick={() => navigate("/home")}>
          Shop_punk
        </span>
        <span className='flex flex-row items-center flex-grow mx-[6rem] h-10 border border-neutral-400 rounded-lg bg-neutral-800 border-none'>
          {<GoSearch className='mx-5 ' />}
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            className='h-full flex-grow bg-inherit outline-none px-2'
            placeholder='Search for products'></input>
          <div className='border-l h-3/5 border-neutral-500'></div>
          <button className='px-4 h-full rounded-r-lg hover:text-pink-500'>
            Search
          </button>
        </span>
        <span className='flex flex-row items-center gap-6 h-full'>
          <button
            className='flex flex-row gap-1 py-3 items-start h-full group'
            onClick={() => navigate("/home")}>
            <HiOutlineHome
              className={`${
                navBtnState === "home" && "stroke-pink-500"
              } w-6 h-auto group-hover:stroke-pink-500`}
            />
            <p
              className={`${
                navBtnState === "home" && "text-pink-500"
              } text-lg group-hover:text-pink-500`}>
              Home
            </p>
          </button>
          <button
            className='flex flex-row gap-1 py-3 items-start h-full group'
            onClick={() => navigate("/products")}>
            <HiOutlineShoppingBag
              className={`${
                navBtnState === "products" && "stroke-pink-500"
              } w-6 h-auto group-hover:stroke-pink-500`}
            />
            <p
              className={`${
                navBtnState === "products" && "text-pink-500"
              } text-lg group-hover:text-pink-500`}>
              Shop
            </p>
          </button>
          <button
            ref={userArea}
            className='flex flex-row gap-1 py-3 items-start h-full group relative'
            onClick={() => handleClickUser()}>
            <LuUser
              className={`${
                navBtnState === "user" && "stroke-pink-500"
              } w-6 h-auto group-hover:stroke-pink-500`}
            />
            <p
              className={`${
                navBtnState === "user" && "text-pink-500"
              } text-lg group-hover:text-pink-500 max-w-24 whitespace-nowrap truncate`}>
              {user?.username}
            </p>
            <div
              ref={usermenu}
              className='absolute top-14 right-0 w-auto hidden flex-col items-start bg-neutral-700  rounded-md'>
              <div className='w-3 h-3 bg-inherit rotate-45 absolute right-8 top-0 -translate-y-1/2'></div>
              {Object.keys(user).length === 0 && (
                <p
                  className='pl-3 pr-10 py-2 w-full text-start text-nowrap hover:text-pink-500 flex flex-row gap-4'
                  onClick={() => navigate("/auth/login")}>
                  <MdLogin className='h-5 w-auto' /> <span>Log in</span>
                </p>
              )}
              {Object.keys(user).length === 0 && (
                <p
                  className='pl-3 pr-10 py-2 w-full text-start text-nowrap hover:text-pink-500 flex flex-row gap-4'
                  onClick={() => navigate("/auth/signup")}>
                  <FiUserPlus className='h-5 w-auto' /> <span>Sign up</span>
                </p>
              )}
              {user.isAdmin && (
                <p
                  className='pl-3 pr-10 py-2 w-full text-start text-nowrap hover:text-pink-500 flex flex-row gap-4'
                  onClick={() => navigate("/admin")}>
                  <MdOutlineAdminPanelSettings className='h-5 w-auto' />
                  <span>Admin</span>
                </p>
              )}
              {Object.keys(user).length !== 0 && (
                <p
                  className='pl-3 pr-10 py-2 w-full text-start text-nowrap hover:text-pink-500 flex flex-row gap-4'
                  onClick={() => navigate("/user/profile")}>
                  <FiUserCheck className='h-5 w-auto' /> <span>Profile</span>
                </p>
              )}
              {Object.keys(user).length !== 0 && (
                <p
                  className='pl-3 pr-10 py-2 w-full text-start text-nowrap hover:text-pink-500 flex flex-row gap-4'
                  onClick={() => navigate("/user/cart")}>
                  <FiShoppingCart className='h-5 w-auto' />
                  <span>Cart</span>
                </p>
              )}
              {Object.keys(user).length !== 0 && (
                <p
                  className='pl-3 pr-10 py-2 w-full text-start text-nowrap hover:text-pink-500 flex flex-row gap-4'
                  onClick={() => navigate("/user/favorite")}>
                  <LuHeart className='h-5 w-auto' /> <span>Favorite</span>
                </p>
              )}
              {Object.keys(user).length !== 0 && (
                <p
                  className='pl-3 pr-10 py-2 w-full text-start text-nowrap hover:text-pink-500 flex flex-row gap-4'
                  onClick={() => navigate("/user/ordered")}>
                  <LuCalendarClock className='h-5 w-auto' />{" "}
                  <span>Ordered</span>
                </p>
              )}
              {Object.keys(user).length !== 0 && (
                <p
                  className='pl-3 pr-10 py-2 w-full text-start text-nowrap hover:text-pink-500 flex flex-row gap-4'
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
            onClick={() => handleClickAdmin()}
            className='absolute z-10 top-full translate-y-4 right-0 xl:left-full -translate-x-1 xl:translate-x-4 bg-neutral-700 p-2 rounded-md w-fit group'>
            <LuLayoutDashboard className='w-6 h-auto stroke-neutral-300 group-hover:stroke-pink-500' />
            <div
              ref={adminMenu}
              className='absolute top-full translate-y-4 right-0 rounded-lg hidden flex-col items-start bg-neutral-700'>
              <div className='w-3 h-3 bg-inherit rotate-45 absolute right-5 top-0 -translate-y-1/2'></div>
              <p
                className='pl-3 pr-10 py-2 w-full hover:text-pink-500 text-nowrap text-start'
                onClick={() => navigate("/admin")}>
                Dashboard
              </p>
              <p
                className='pl-3 pr-10 py-2 w-full hover:text-pink-500 text-nowrap text-start'
                onClick={() => navigate("/admin/products/create")}>
                Create product
              </p>
              <p
                className='pl-3 pr-10 py-2 w-full hover:text-pink-500 text-nowrap text-start'
                onClick={() => navigate("/admin/products")}>
                Manage products
              </p>
              <p
                className='pl-3 pr-10 py-2 w-full hover:text-pink-500 text-nowrap text-start'
                onClick={() => navigate("/admin/orders")}>
                Manage orders
              </p>
              <p
                className='pl-3 pr-10 py-2 w-full hover:text-pink-500 text-nowrap text-start'
                onClick={() => navigate("/admin/users")}>
                Manage users
              </p>
            </div>
          </button>
        )}
      </div>
    </header>
  );
};

export default memo(Navigation);
