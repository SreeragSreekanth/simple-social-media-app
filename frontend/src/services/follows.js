import api from "../api/axios";

export const fetchFollowers = (userId) =>
  api.get(`/follows/followers/${userId}/`);

export const fetchFollowing = (userId) =>
  api.get(`/follows/following/${userId}/`);

