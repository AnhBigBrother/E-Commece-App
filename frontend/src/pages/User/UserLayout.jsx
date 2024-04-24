import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const UserLayout = () => {
  const user = useSelector(store => store.user);

  return <>{user?.username ? <Outlet /> : <Navigate to='/auth/login' />}</>;
};

export default UserLayout;
