import { useEffect, useState } from "react";
import { toggleFollow, checkFollowStatus } from "../services/follows";

const FollowButton = ({ userId }) => {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    load();
  }, [userId]);

  const load = async () => {
    const res = await checkFollowStatus(userId);
    setFollowing(res.data.is_following);
  };

  const toggle = async () => {
    const res = await toggleFollow(userId);
    setFollowing(res.data.following);
  };

  return (
    <button
      onClick={toggle}
      className={`px-4 py-1 rounded ${
        following ? "border" : "bg-black text-white"
      }`}
    >
      {following ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
