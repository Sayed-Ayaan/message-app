import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './pages/signup.jsx'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx';
import PrivateRoute from './components/private.jsx';

export default function Router() {
  const router = createBrowserRouter([
    { path: "/signup", element: <SignUp /> },
    { path: "/login", element: <Login /> },
     {
      path: "/",
      element: <PrivateRoute />, 
      children: [
        { index: true, element: <Home /> },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}
