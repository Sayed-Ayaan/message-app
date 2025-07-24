import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import SignUp from './pages/signup.jsx'
import Home from './pages/signup.jsx'

export default function Router(){
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/signup",
      element: <SignUp/>
    },
  ]);

  return <RouterProvider router={router}/>
}
