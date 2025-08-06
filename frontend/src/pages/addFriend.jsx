import { useAuth } from "../context/authContext";
import { useState } from "react";

export default function AddFriend() {
  const { user } = useAuth();
  const [receiver, setReceiver] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 flex justify-center items-start pt-12 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl ring-1 ring-gray-200 dark:ring-gray-700"
        >
          <h2 className="text-2xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-wide">
            Add Friend
          </h2>

          <label
            htmlFor="friendName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Friend's Name
          </label>
          <input
            id="friendName"
            type="text"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 mb-6 transition"
            placeholder="Enter name"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
          />

          <button
            type="submit"
            className="w-full inline-flex justify-center items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 text-white font-semibold rounded-xl shadow-md transition"
          >
            Add Friend
          </button>

          {message && (
            <p className="mt-6 text-center text-sm text-red-600 dark:text-red-400 font-medium">
              {message}
            </p>
          )}
        </form>
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

