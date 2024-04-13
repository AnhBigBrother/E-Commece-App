import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import updateUserProfile from "./redux/actions/updateUserProfile.js";
import Navigation from "./components/Navigation.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/User/Cart.jsx";
import Favorite from "./pages/User/Favorite.jsx";
import Login from "./pages/Auth/Login.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import Profile from "./pages/User/Profile.jsx";
import UserOrdered from "./pages/User/UserOrdered.jsx";
import AllProducts from "./pages/Products/AllProducts/AllProducts.jsx";
import ProductDetail from "./pages/Products/ProductDetail/ProductDetail.jsx";

import Dashboard from "./pages/Admin/Dashboard.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import ManageProducts from "./pages/Admin/ManageProducts.jsx";
import ManageUsers from "./pages/Admin/ManageUsers.jsx";
import ManageOrders from "./pages/Admin/ManageOrders.jsx";
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const local = localStorage.getItem("user");
    if (local) {
      dispatch(updateUserProfile(JSON.parse(local)));
    }
  }, []);
  return (
    <div className='text-white bg-neutral-900 h-auto min-w-fit min-h-fit flex flex-col items-center justify-start'>
      <ToastContainer
        className={"mt-24"}
        position='top-right'
        autoClose={3200}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme='dark'
        transition:Bounce
      />
      <BrowserRouter>
        <Navigation />
        <div className='pt-24 min-h-screen w-full px-3 xl:px-0 xl:w-4/5'>
          <Routes>
            <Route
              index
              element={<Navigate to='/home' />}></Route>
            <Route
              path='/home'
              element={<Home />}></Route>
            <Route path='/auth'>
              <Route
                path='login'
                element={<Login />}></Route>
              <Route
                path='signup'
                element={<SignUp />}></Route>
            </Route>
            <Route path='/user'>
              <Route
                path='cart'
                element={<Cart />}></Route>
              <Route
                path='favorite'
                element={<Favorite />}></Route>
              <Route
                path='profile'
                element={<Profile />}></Route>
              <Route
                path='ordered'
                element={<UserOrdered />}></Route>
            </Route>
            <Route path='/admin'>
              <Route
                index
                element={<Dashboard />}></Route>
              <Route
                path='orders'
                element={<ManageOrders />}></Route>
              <Route
                path='users'
                element={<ManageUsers />}></Route>
              <Route path='products'>
                <Route
                  index
                  element={<ManageProducts />}></Route>
                <Route
                  path='create'
                  element={<CreateProduct />}></Route>
                <Route
                  path=':id'
                  element={<UpdateProduct />}></Route>
              </Route>
            </Route>
            <Route path='/products'>
              <Route
                index
                element={<AllProducts />}></Route>
              <Route
                path=':id'
                element={<ProductDetail />}></Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
