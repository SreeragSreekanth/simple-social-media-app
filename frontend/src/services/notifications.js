import api from "../api/axios";

export const fetchNotifications = () =>
  api.get("/notifications/");

export const markAsRead = (id) =>
  api.patch(`/notifications/read/${id}/`, {});
