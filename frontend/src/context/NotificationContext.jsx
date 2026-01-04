import { createContext, useEffect, useState } from "react";
import api from "../api/axios";
import { connectNotificationSocket } from "../services/socket";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Load from REST
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/notifications/");
    setNotifications(res.data);
  };

  // WebSocket
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;

    const socket = connectNotificationSocket(token, (data) => {
      setNotifications((prev) => [
        {
          id: Date.now(), // temp id
          sender_id: data.sender_id,
          sender_name: data.sender,
          sender_pic: null,
          notification_type: data.type,
          post_id: data.post_id || null,
          is_read: false,
        },
        ...prev,
      ]);
    });

    return () => socket.close();
  }, []);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const markAsRead = async (id) => {
    await api.patch(`/notifications/read/${id}/`);
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, is_read: true } : n)
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
