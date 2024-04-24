import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/Navigation.jsx';

const Layout = () => {
  return (
    <main className='relative font-sans text-neutral-900 bg-neutral-100 dark:text-white dark:bg-neutral-900 h-auto min-h-screen flex flex-col items-center justify-start w-fit min-w-full'>
      <ToastContainer
        className='mt-16'
        position='top-center'
        autoClose={3200}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme='colored'
        transition:Bounce
      />
      <Navigation />
      <div className='flex-grow w-full px-3 xl:px-0 xl:w-4/5'>
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
