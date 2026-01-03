const NotificationItem = ({ n, onRead }) => {
  const handleClick = () => {
    if (!n.is_read) onRead(n.id);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex gap-3 p-3 border-b cursor-pointer ${
        n.is_read ? "bg-white" : "bg-gray-100"
      }`}
    >
      {n.sender_pic && (
        <img
          src={n.sender_pic}
          alt=""
          className="w-8 h-8 rounded-full"
        />
      )}

      <div className="text-sm">
        <span className="font-semibold">{n.sender_name}</span>{" "}
        {n.notification_type === "LIKE" && "liked your post"}
        {n.notification_type === "COMMENT" && "commented on your post"}
        {n.notification_type === "FOLLOW" && "started following you"}
      </div>
    </div>
  );
};

export default NotificationItem;
