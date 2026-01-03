import { useEffect, useState } from "react";
import { fetchNotifications, markAsRead } from "../services/notifications";
import NotificationItem from "./NotificationItem";
import { connectNotificationSocket } from "../services/socket";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1️⃣ Load notifications from API
  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetchNotifications();
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ Connect to WebSocket for real-time notifications
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;

    const socket = connectNotificationSocket(token, (data) => {
      setNotifications((prev) => [
        {
          id: Date.now(), // temporary ID until server refresh
          sender_name: data.sender,
          sender_pic: null,
          notification_type: data.type,
          is_read: false,
          post_id: data.post_id || null,
        },
        ...prev,
      ]);
    });

    return () => socket.close();
  }, []);

  // 3️⃣ Mark a notification as read
  const onRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 4️⃣ Compute unread count dynamically
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  if (loading) return <p className="text-center mt-10">Loading…</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-6 border rounded">
      <h2 className="font-semibold p-3 border-b flex justify-between items-center">
        Notifications
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
            {unreadCount}
          </span>
        )}
      </h2>

      {notifications.length === 0 && (
        <p className="p-4 text-center text-gray-500">
          No notifications yet
        </p>
      )}

      {notifications.map((n) => (
        <NotificationItem key={n.id} n={n} onRead={onRead} />
      ))}
    </div>
  );
};

export default Notifications;
