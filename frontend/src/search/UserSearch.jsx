import { useEffect, useState } from "react";
import { searchUsers } from "../services/users";
import { useNavigate } from "react-router-dom";

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await searchUsers(query);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    }, 400); // debounce

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative">
      <input
        className="border rounded px-3 py-1 text-sm w-48"
        placeholder="Search users…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length > 0 && (
        <div className="absolute top-10 w-full bg-white border rounded shadow">
          {results.map((u) => (
            <div
              key={u.id}
              onClick={() => {
                navigate(`/profile/${u.id}`);
                setQuery("");
                setResults([]);
              }}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={u.profile_pic ? u.profile_pic : "/default.png"}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm">{u.full_name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSearch;
