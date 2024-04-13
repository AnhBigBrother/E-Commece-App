import { useState, useEffect } from "react";
import axios from "../../api/axios.js";
import updateUserProfile from "../../redux/actions/updateUserProfile.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader.jsx";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/home");
    }
  }, []);

  const handleClickSignIn = async () => {
    if (isloading) {
      return;
    }
    if (email.length === 0 || password.length === 0) {
      toast.warn("Missing information!");
      return;
    }
    setIsloading(true);
    axios
      .post("/auth/login", {
        email,
        password,
      })
      .then(res => {
        dispatch(updateUserProfile(res.data.results));
        localStorage.setItem("user", JSON.stringify(res.data.results));
        setIsloading(false);
        toast.success("Success!");
        navigate("/home");
      })
      .catch(err => {
        setIsloading(false);
        toast.error(err.response.data.error || "Something wrong, try later!");
      });
  };

  return (
    <section className='pl-[10rem] flex flex-wrap'>
      <div className='mr-[4rem] mt-[4rem]'>
        <h1 className='text-2xl font-semibold mb-4'>Sign in</h1>
        <div className='container w-[40rem]'>
          <div className='my-[2rem]'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-white'>
              Email
            </label>
            <input
              type='email'
              id='email'
              className='border mt-1 p-2 rounded-md w-full bg-neutral-800'
              value={email}
              onChange={e => setEmail(e.target.value)}></input>
          </div>

          <div className='my-[2rem]'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-white'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='border mt-1 p-2 rounded-md w-full bg-neutral-800'
              value={password}
              onChange={e => setPassword(e.target.value)}></input>
          </div>

          <button
            className='bg-pink-500 hover:bg-pink-700 px-4 py-2 rounded-md'
            onClick={() => handleClickSignIn()}>
            {isloading ? <Loader /> : <span>Sign in</span>}
          </button>
        </div>
        <p className='py-6'>
          New customer?&nbsp;
          <a
            className='text-pink-500 hover:underline cursor-pointer'
            href='/signup'>
            Sign up
          </a>
          &nbsp;here
        </p>
      </div>
    </section>
  );
};

export default Login;
