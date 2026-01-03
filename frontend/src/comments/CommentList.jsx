import { useEffect, useState } from "react";
import { fetchComments, deleteComment } from "../services/comments";
import AddComment from "./AddComment";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const res = await fetchComments(postId);
      setComments(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [postId]);

  const onAdded = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete comment?")) return;
    try {
      await deleteComment(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete comment");
    }
  };

  if (loading) return <p className="text-sm text-gray-500">Loading comments…</p>;
  if (error) return <p className="text-sm text-red-500">{error}</p>;

  return (
    <div className="mt-3">
      {comments.map((c) => (
        <div key={c.id} className="flex gap-2 items-start mb-2">
          {c.profile_pic && (
            <img
              src={c.profile_pic}
              alt=""
              className="w-6 h-6 rounded-full"
            />
          )}
          <div className="flex-1">
            <span className="font-semibold text-sm">{c.full_name}</span>
            <p className="text-sm">{c.text}</p>
          </div>
          <button
            onClick={() => onDelete(c.id)}
            className="text-xs text-red-500"
          >
            Delete
          </button>
        </div>
      ))}

      <AddComment postId={postId} onAdded={onAdded} />
    </div>
  );
};

export default CommentList;
