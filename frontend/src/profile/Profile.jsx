import { useEffect, useState } from "react";
import { fetchMyProfile } from "../services/users";
import { fetchMyPosts } from "../services/posts";
import PostCard from "../feed/PostCard";
import { Link } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  

  const load = async () => {
    try {
      const profileRes = await fetchMyProfile();
      setProfile(profileRes.data);

      const postsRes = await fetchMyPosts();
      setPosts(postsRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load profile");
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!profile) return <p className="text-center mt-10">Loading profile…</p>;

  return (
    <div className="max-w-xl mx-auto mt-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        {profile.profile_pic && (
          <img
            src={profile.profile_pic}
            alt=""
            className="w-20 h-20 rounded-full"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">{profile.full_name}</h2>
          <p className="text-gray-600">{profile.bio}</p>

          <div className="flex gap-4 mt-2 text-sm">
            <Link to={`/followers`} className="hover:underline">
              <strong>{profile.followers_count}</strong> Followers
            </Link>
            <Link to={`/following`} className="hover:underline">
              <strong>{profile.following_count}</strong> Following
            </Link>
          </div>
        </div>
      </div>

      {/* My Posts */}
      <h3 className="font-semibold mb-3">My Posts</h3>
      {posts.length === 0 && (
        <p className="text-gray-500">No posts yet</p>
      )}
      {posts.map((p) => (
        <PostCard key={p.id} post={p} onDeleted={() => load()} />
      ))}
    </div>
  );
};

export default Profile;
