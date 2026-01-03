import { useEffect, useState } from "react";
import { fetchFeed, fetchFollowingFeed } from "../services/posts";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [mode, setMode] = useState("following"); // "following" | "explore"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch feed whenever mode changes
  useEffect(() => {
    loadFeed();
  }, [mode]);

  // Load feed from backend
  const loadFeed = async () => {
    try {
      setLoading(true);
      setError("");

      const res =
        mode === "following"
          ? await fetchFollowingFeed()
          : await fetchFeed();

      setPosts(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  // Called when a post is deleted
  const onDeleted = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // Called when a post is created
  const onCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-xl mx-auto py-6">
        {/* FEED TOGGLE */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setMode("following")}
            className={`px-4 py-2 rounded ${
              mode === "following" ? "bg-black text-white" : "border"
            }`}
          >
            Following
          </button>

          <button
            onClick={() => setMode("explore")}
            className={`px-4 py-2 rounded ${
              mode === "explore" ? "bg-black text-white" : "border"
            }`}
          >
            Explore
          </button>
        </div>

        {/* Create Post */}
        {mode === "following" && <CreatePost onCreated={onCreated} />}

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500 mt-10">Loading feed…</p>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="text-center text-red-500 mt-10">{error}</p>
        )}

        {/* Posts */}
        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No posts to show
          </p>
        )}

        {!loading &&
          !error &&
          posts.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              onDeleted={onDeleted} // updates local state without refetch
            />
          ))}
      </div>
    </div>
  );
};

export default Feed;
