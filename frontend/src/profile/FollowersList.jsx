import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchFollowers } from "../services/follows";
import api from "../api/axios";

const FollowersList = () => {
  const { userId } = useParams();   // 👈 IMPORTANT
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (userId) load();
  }, [userId]);

  const load = async () => {
    const res = await fetchFollowers(userId);
    setUsers(res.data);
  };

  // const avatar = (pic) =>
  //   pic ? `${api.defaults.baseURL}${pic}` : "/default.webp";

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="font-semibold mb-4">Followers</h2>

      {users.length === 0 && (
        <p className="text-gray-500">No followers yet</p>
      )}

      {users.map((u) => (
        <Link
          key={u.id}
          to={`/profile/${u.id}`}
          className="flex items-center gap-3 mb-3 p-2 rounded hover:bg-gray-100"
        >
          <img
            src={u.profile_pic ? u.profile_pic : "/defult.webp"}
            className="w-8 h-8 rounded-full object-contain"
          />
          <span>{u.full_name}</span>
        </Link>
      ))}
    </div>
  );
};

export default FollowersList;
