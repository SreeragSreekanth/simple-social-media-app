import { useState } from "react";
import { createPost } from "../services/posts";

const CreatePost = ({ onCreated }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      setLoading(true);
      setError("");
      const res = await createPost(formData);
      setCaption("");
      setImage(null);
      onCreated(res.data);
      console.log(res.data);

    } catch {
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white border border-gray-200 rounded-xl p-4 mb-6"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-gray-300" />
        <span className="font-medium text-sm">Create post</span>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt=""
          className="rounded-lg mb-3 max-h-80 object-cover"
        />
      )}

      <textarea
        className="w-full resize-none border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
        rows={3}
        placeholder="What’s on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <div className="flex items-center justify-between mt-3">
        <label className="text-sm text-gray-600 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImage(e.target.files[0])}
          />
          📷 Add photo
        </label>

        <button
          disabled={loading}
          className="bg-black text-white text-sm px-4 py-1.5 rounded-full disabled:opacity-50"
        >
          {loading ? "Posting…" : "Post"}
        </button>
      </div>
    </form>
  );
};


export default CreatePost;
