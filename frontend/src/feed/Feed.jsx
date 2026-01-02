import { useEffect, useState } from "react";
import { fetchFeed } from "../services/posts";
import PostCard from "./PostCard";
import CreatePost from "./CreatePost";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeed();
  }, []);

  const loadFeed = async () => {
    try {
      setLoading(true);
      const res = await fetchFeed();
      setPosts(res.data);
    } catch {
      setError("Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  const onDeleted = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const onCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-20">
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-20">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-xl mx-auto py-6">
        <CreatePost onCreated={onCreated} />

        {posts.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            No posts yet
          </div>
        ) : (
          posts.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              onDeleted={onDeleted}
            />
          ))
        )}
      </div>
    </div>
  );
};


export default Feed;
