import api from "../api/axios";

export const fetchFeed = () => api.get("/posts/feed/");
export const fetchMyPosts = () => api.get("/posts/my-posts/");
export const createPost = (formData) =>
  api.post("/posts/create/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deletePost = (id) => api.delete(`/posts/delete/${id}/`);
export const toggleLike = (postId) => api.post(`/likes/toggle/${postId}/`);
