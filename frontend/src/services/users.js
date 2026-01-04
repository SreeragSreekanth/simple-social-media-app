import api from "../api/axios";

export const fetchMyProfile = () => api.get("/users/profile/");
export const fetchUserProfile = (userId) =>
  api.get(`/users/${userId}/`);
