import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function PrivateRoute({ children }) {
  const { user, authLoading } = useAuth();

  if (authLoading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" />;
}
