import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";
import NotificationItem from "./NotificationItem";

const Notifications = () => {
  const { notifications, unreadCount, markAsRead } =
    useContext(NotificationContext);

  return (
    <div className="max-w-md mx-auto mt-6 border rounded">
      <h2 className="font-semibold p-3 border-b flex justify-between">
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
        <NotificationItem key={n.id} n={n} onRead={markAsRead} />
      ))}
    </div>
  );
};

export default Notifications;
