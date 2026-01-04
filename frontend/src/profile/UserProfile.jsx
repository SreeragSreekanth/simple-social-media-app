import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserProfile } from "../services/users";
import { fetchUserPosts } from "../services/posts";
import FollowButton from "./FollowButton";
import PostCard from "../feed/PostCard";

const UserProfile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    load();
  }, [userId]);

  const load = async () => {
    const profileRes = await fetchUserProfile(userId);
    setProfile(profileRes.data);

    const postsRes = await fetchUserPosts(userId);
    setPosts(postsRes.data);
  };

  if (!profile) return <p>Loading…</p>;

  return (
    <div className="max-w-xl mx-auto mt-6">
      <div className="flex gap-4 mb-6">
        {profile.profile_pic && (
          <img src={profile.profile_pic} className="w-20 h-20 rounded-full" />
        )}
        <div>
          <h2 className="text-xl font-semibold">{profile.full_name}</h2>
          <p>{profile.bio}</p>
          <FollowButton userId={profile.id} />
        </div>
      </div>

      {posts.map(p => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
};

export default UserProfile;
