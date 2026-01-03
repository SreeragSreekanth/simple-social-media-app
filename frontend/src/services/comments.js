import api from "../api/axios";

export const fetchComments = (postId) =>
  api.get(`/comments/list/${postId}/`);

export const addComment = (postId, text) =>
  api.post(`/comments/add/${postId}/`, { text });

export const deleteComment = (commentId) =>
  api.delete(`/comments/delete/${commentId}/`);
