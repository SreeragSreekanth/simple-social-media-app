import api from "../api/axios";

export const fetchMyProfile = () => api.get("/users/profile/");
