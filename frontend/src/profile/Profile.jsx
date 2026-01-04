import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import PostCard from "../feed/PostCard";
import FollowButton from "./FollowButton";

const Profile = () => {
  const { userId } = useParams(); // from URL
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    load();
  }, [userId]);

  const load = async () => {
  const meRes = await api.get("/users/profile/");
  const me = meRes.data;

  const profileRes = userId
    ? await api.get(`/users/${userId}/`)
    : meRes;

  const viewedProfile = profileRes.data;

  const isMyProfile = me.id === viewedProfile.id;

  setProfile(viewedProfile);
  setIsMe(isMyProfile);

  const postsRes = isMyProfile
    ? await api.get("/posts/my-posts/")
    : await api.get(`/posts/user-posts/${viewedProfile.id}/`);

  setPosts(postsRes.data);
};

  if (!profile) return <p className="text-center mt-10">Loading…</p>;

  return (
    <div className="max-w-xl mx-auto mt-6">
      {/* HEADER */}
      <div className="flex gap-4 mb-6">
          <img
  src={
    profile.profile_pic
      ? profile.profile_pic
      : "/defult.webp"
  }
  alt=""
  className="w-20 h-20 rounded-full"
/>

      

        <div>
          <h2 className="text-xl font-semibold">{profile.full_name}</h2>
          <p className="text-gray-600">{profile.bio}</p>

          <div className="flex gap-4 mt-2 text-sm">
            <Link
              to={`/profile/${profile.id}/followers`}
              className="hover:underline"
            >
              <strong>{profile.followers_count}</strong> Followers
            </Link>

            <Link
              to={`/profile/${profile.id}/following`}
              className="hover:underline"
            >
              <strong>{profile.following_count}</strong> Following
            </Link>
          </div>


          {/* ACTION BUTTON */}
          {isMe ? (
            <Link
              to="/edit-profile"
              className="inline-block mt-3 px-4 py-1 border rounded"
            >
              Edit Profile
            </Link>
          ) : (
            <div className="mt-3">
              <FollowButton userId={profile.id} />
            </div>
          )}
        </div>
      </div>

      {/* POSTS */}
      <h3 className="font-semibold mb-3">
        {isMe ? "My Posts" : "Posts"}
      </h3>

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
