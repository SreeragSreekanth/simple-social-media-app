import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchFollowing } from "../services/follows";
import api from "../api/axios";

const FollowingList = () => {
  const { userId } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (userId) load();
  }, [userId]);

  const load = async () => {
    const res = await fetchFollowing(userId);
    setUsers(res.data);
  };

  // const avatar = (pic) =>{
  //   if (!pic) return "/default.webp";
  //   if (pic.startsWith("http")) return pic;
  //   return `${api.defaults.baseURL}${pic}`;
  // };
  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="font-semibold mb-4">Following</h2>

      {users.length === 0 && (
        <p className="text-gray-500">Not following anyone yet</p>
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

export default FollowingList;
