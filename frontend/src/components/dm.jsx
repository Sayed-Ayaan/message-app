import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";

export default function Dm() {
  const [dms, setDms] = useState([]);
  const [message, setMessage] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    getDms();
  }, []);

  return (
    <aside className="w-64 min-w-64 h-full bg-gray-800 p-4 overflow-y-auto overflow-x-hidden">
      <h2 className="text-white text-lg font-semibold mb-4 whitespace-nowrap">Direct Messages</h2>

      {message && (
        <p className="text-red-500 mb-2 break-words">{message}</p>
      )}

      {dms.map((dm) => (
        <p
          key={dm.id}
          className="text-white hover:bg-gray-700 p-2 rounded cursor-pointer border-b border-gray-700 break-words"
        >
          {dm.username}
        </p>
      ))}
    </aside>
  );

  async function getDms() {
    try {
      const url = new URL("http://localhost:3000/dms");
      url.search = new URLSearchParams({ username: user }).toString();

      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error);
        return;
      }
      setMessage(null);
      setDms(data.dms);
    } catch (error) {
      console.error(error);
      setMessage("Sorry, there was an error!");
    }
  }
}
