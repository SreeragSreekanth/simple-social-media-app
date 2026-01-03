import { useState } from "react";
import { addComment } from "../services/comments";

const AddComment = ({ postId, onAdded }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setLoading(true);
      setError("");
      const res = await addComment(postId, text);
      setText("");
      onAdded(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex gap-2 mt-2">
      <input
        className="border rounded w-full p-2"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        disabled={loading}
        className="bg-black text-white px-3 rounded"
      >
        {loading ? "..." : "Post"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default AddComment;
