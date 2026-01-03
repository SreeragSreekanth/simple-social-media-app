import { useState } from "react";
import { toggleLike, deletePost } from "../services/posts";
import CommentList from "../comments/CommentList";


const PostCard = ({ post, onDeleted }) => {
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes_count || 0);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLike = async () => {
    try {
      setLoading(true);
      const res = await toggleLike(post.id);
      setLiked(res.data.liked);
      setLikes((v) => (res.data.liked ? v + 1 : v - 1));
    } catch {
      alert("Failed to like post");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await deletePost(post.id);
      onDeleted(post.id);
    } catch {
      alert("Failed to delete post");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl mb-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          {post.profile_pic ? (
            <img
              src={post.profile_pic}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300" />
          )}
          <span className="font-medium">{post.full_name}</span>
        </div>

        {post.is_owner && (
  <button
    onClick={onDelete}
    className="text-gray-400 hover:text-red-500 text-sm"
  >
    Delete
  </button>
)}

      </div>

      {/* Image */}
      <img
        src={post.image}
        alt=""
        className="w-full object-cover max-h-[500px]"
      />

      {/* Caption & Actions */}
      <div className="p-3 space-y-2">
        <p className="text-sm">{post.caption}</p>

        <div className="flex items-center gap-4">
          <button
            onClick={onLike}
            disabled={loading}
            className={`flex items-center gap-1 text-sm ${
              liked ? "text-red-500" : "text-gray-600"
            }`}
          >
            {liked ? "💖" : "🤍"} {likes}
          </button>

          <button
  onClick={() => setShowComments((v) => !v)}
  className="text-gray-600 text-sm flex items-center gap-1"
>
  💬 {post.comments_count || 0}
</button>

        </div>
        {showComments && (
  <div className="mt-2 max-h-48 overflow-y-auto border-t pt-2">
    <CommentList postId={post.id} />
  </div>
)}
      </div>
    </div>
  );
};

export default PostCard;
