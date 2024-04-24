import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const user = useSelector(store => store.user);
  return <>{user.username ? <Navigate to='/home' /> : <Outlet />}</>;
};

export default AuthLayout;
