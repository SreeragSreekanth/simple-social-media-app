import { useNavigate } from "react-router-dom";

const NotificationItem = ({ n, onRead }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onRead(n.id);

    if (n.notification_type === "FOLLOW") {
      navigate(`/profile/${n.sender_id}`);
    }

    // if (n.post_id) {
    //   navigate(`/post/${n.post_id}`);
    // }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-3 p-3 border-b cursor-pointer ${
        n.is_read ? "bg-white" : "bg-gray-100"
      }`}
    >
      {/* Profile Picture */}
      <img
        src={n.sender_pic ? n.sender_pic : "/default.png"} // optional helper
        alt=""
        className="w-8 h-8 rounded-full object-contain flex-shrink-0"
      />

      {/* Text */}
      <span className="text-sm">
        <span className="font-semibold">{n.sender_name}</span>{" "}
        {n.notification_type === "LIKE" && "liked your post"}
        {n.notification_type === "COMMENT" && "commented on your post"}
        {n.notification_type === "FOLLOW" && "started following you"}
      </span>
    </div>
  );
};

export default NotificationItem;
