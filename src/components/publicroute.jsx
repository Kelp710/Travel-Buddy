import { Navigate , Outlet} from 'react-router-dom';
import { useAuthContext } from '../context/authcontext';
const PublicRoute = () => {
  const { user } = useAuthContext();
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;