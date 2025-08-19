import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Header from "../components/header";
import Dm from './dm';

export default function PrivateRoute() {
  const { user, authLoading } = useAuth();

  if (authLoading) return <div>Loading...</div>;

  return user ? (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
          <Dm />
        <div className="flex-1 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}
