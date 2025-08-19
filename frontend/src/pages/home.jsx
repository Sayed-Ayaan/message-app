import { useAuth } from "../context/authContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 flex justify-center items-start pt-32 px-4 text-center">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
          Welcome Back
        </h2>
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
          {user}
        </h3>
      </div>
    </div>
  );
}
