import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-black">
      <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">
        {`Welcome, ${user}`}
      </div>
      <nav className="space-x-4">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-white hover:bg-blue-500 transition rounded dark:text-gray-200"
        >
          Friends
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-white hover:bg-blue-500 transition rounded dark:text-gray-200"
        >
          Groups
        </button>
         <button onClick={()=>navigate("/addfriend")}
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-white hover:bg-blue-500 transition rounded dark:text-gray-200"
        >
          Add Friends
        </button>
        <button onClick={()=>navigate("/requests")}
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-white hover:bg-blue-500 transition rounded dark:text-gray-200"
        >
          Friend Requests
        </button>
        
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-red-700 border border-red-500 hover:text-white hover:bg-red-500 transition rounded dark:text-white dark:bg-red-500 dark:hover:text-red-500 dark:hover:bg-white"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
