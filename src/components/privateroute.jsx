import { Route, Navigate , Outlet} from 'react-router-dom';
import { useAuthContext } from '../context/authcontext';
const PrivateRoute = () => {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;