import notification from "@/assets/icons/notifications.svg";
import { useState } from "react";
import { useGetNotificationsQuery } from "@/data/services/notificationsService";
import { Link } from "react-router-dom";
import moment from "moment";

const CustomNotification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { data } = useGetNotificationsQuery();
  const openNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  console.log(data);

  return (
    <div className="flex items-center relative">
      <button onClick={openNotifications}>
        <img src={notification} alt="Notification Icon" />
      </button>
      {showNotifications && (
        <div className="w-[250px] h-[250px] z-10 p-3 rounded-xl shadow-lg absolute top-full right-0 mt-2 bg-white overflow-y-scroll">
          <h2 className="text-md font-semibold">Bildirişlər</h2>
          <div className="mt-4 flex flex-col gap-4">
            {data.map((notification) => (
              <Link
                to={notification.url}
                key={notification.id}
                className="flex items-center gap-3 hover:bg-gray-400/40 p-2 rounded-lg"
              >
                <div className="flex items-center gap-3 w-[65%]">
                  <p className="text-xs">{notification.title}</p>
                </div>
                <span className="text-xs flex flex-col gap-2 flex-wrap">
                  {moment(notification.created_at).fromNow()}
                  <div>{moment(notification.created_at).format("HH:ss")}</div>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomNotification;
