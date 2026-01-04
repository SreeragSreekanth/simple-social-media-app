import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const EditProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    bio: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/users/profile/");
    setForm({
      full_name: res.data.full_name || "",
      bio: res.data.bio || "",
    });
    setPreview(res.data.profile_pic);
  };

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("full_name", form.full_name);
    fd.append("bio", form.bio);
    if (profilePic) fd.append("profile_pic", profilePic);

    await api.patch("/users/profile/", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    navigate("/profile");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-6 space-y-3">
      {preview && (
        <img
          src={preview}
          alt=""
          className="w-24 h-24 rounded-full mx-auto object-cover"
        />
      )}

      <input
        value={form.full_name}
        onChange={(e) =>
          setForm({ ...form, full_name: e.target.value })
        }
        className="border p-2 w-full"
      />

      <textarea
        value={form.bio}
        onChange={(e) =>
          setForm({ ...form, bio: e.target.value })
        }
        className="border p-2 w-full"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          setProfilePic(file);
          setPreview(URL.createObjectURL(file));
        }}
      />

      <button className="bg-black text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
};

export default EditProfile;
