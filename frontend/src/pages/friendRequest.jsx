import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

export default function FriendRequest() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [requests, setRequests] = useState([]);

  useEffect(() => {
  getRequests();      
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 flex justify-center pt-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl ring-1 ring-gray-200 dark:ring-gray-700">
          <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-wide">
            Friend Requests
          </h2>

          {requests.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 italic">
              No pending requests
            </p>
          )}

          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.sender_id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                  {request.username}
                </span>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleAccept(request.sender_id)}
                    className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 text-white font-semibold rounded-lg shadow-md transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={(e) => handleReject(e, request.sender_id)}
                    className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 text-white font-semibold rounded-lg shadow-md transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          {message && (
            <p className="mt-6 text-center text-sm text-red-600 dark:text-red-400 font-medium">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>

  )

  async function getRequests() {
    try {
      const url = new URL('http://localhost:3000/friendRequest');
      url.search = new URLSearchParams({ username: user }).toString();

      const res = await fetch(url, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error);
        return;
      }
      setRequests(data.friends);
      setMessage(null);
    } catch (error) {
      console.error(error);
      setMessage('An unexpected error occurred.');
    }
  };

  async function handleReject(e, id) {
    e.preventDefault();
    try {
      const url = new URL('http://localhost:3000/deleteFriendRequest');
      url.search = new URLSearchParams({ username: user, senderID: id }).toString();

      const res = await fetch(url, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error);
        return;
      }
      setMessage(null);
      getRequests();
    } catch (error) {
      console.error(error);
      setMessage('An unexpected error occurred.');
    }
  }
};