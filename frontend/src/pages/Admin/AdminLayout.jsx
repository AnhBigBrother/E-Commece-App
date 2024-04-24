import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const user = useSelector(store => store.user);

  return <>{user?.isAdmin ? <Outlet /> : <Navigate to='/home' />}</>;
};

export default AdminLayout;
