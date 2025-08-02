import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Header from "../components/header"

export default function PrivateRoute() {
  const { user, authLoading } = useAuth();

  if (authLoading) return <div>Loading...</div>;

  return user ? (
    <div>
      <Header/>
      <Outlet />
    </div>)
    : <Navigate to="/login" />;
}
