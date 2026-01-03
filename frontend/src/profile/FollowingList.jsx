import { useEffect, useState } from "react";
import { fetchMyProfile } from "../services/users";
import { fetchFollowing } from "../services/follows";

const FollowingList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const me = await fetchMyProfile();
    const res = await fetchFollowing(me.data.id);
    setUsers(res.data);
  };

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="font-semibold mb-4">Following</h2>
      {users.map((u) => (
        <div key={u.id} className="flex items-center gap-3 mb-3">
          {u.profile_pic && (
            <img src={u.profile_pic} className="w-8 h-8 rounded-full" />
          )}
          <span>{u.full_name}</span>
        </div>
      ))}
    </div>
  );
};

export default FollowingList;
