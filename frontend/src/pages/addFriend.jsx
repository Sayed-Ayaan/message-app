import { useAuth } from "../context/authContext";
import { useState } from "react";

export default function AddFriend() {
  const { user } = useAuth();
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-700  flex justify-center pt-12 px-4">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800  dark:text-gray-100">
            Add Friend
          </h2>

          <label
            htmlFor="friendName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Friend's Name
          </label>
          <input
            id="friendName"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 mb-4"
            placeholder="Enter name"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add Friend
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-red-700 dark:text-red-500">{message}</p>
        )}
      </div>
    </div>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (user == receiver) {
      setMessage('You cannot send request to yourself');
      return;
    }
    if (!receiver.trim()) {
      setMessage('Enter a value');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/addfriend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender: user,
          receiver: receiver,
        }),
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'There was an error!');
        return;
      }
      setMessage(null);
      setReceiver('');
    } catch (error) {
      console.error(error);
      setMessage('An unexpected error occurred.');
    }
  }
}

