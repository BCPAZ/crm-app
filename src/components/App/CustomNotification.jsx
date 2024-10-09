import notification from "@/assets/icons/notifications.svg";
import { useState } from "react";

const CustomNotification = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const openNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="flex items-center relative">
      <button onClick={openNotifications}>
        <img src={notification} alt="Notification Icon" />
      </button>
      {showNotifications && (
        <div className="w-[250px] h-[250px] z-10 p-4 rounded-xl shadow-lg absolute top-full right-0 mt-2 bg-white overflow-y-scroll">
          <h2 className="text-md font-semibold">Bildirişlər</h2>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <p className="text-sm">İş axını prosesi artıq yekunlaşıb</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <p className="text-sm">İş axını prosesi artıq yekunlaşıb</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <p className="text-sm">İş axını prosesi artıq yekunlaşıb</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <p className="text-sm">İş axını prosesi artıq yekunlaşıb</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <p className="text-sm">İş axını prosesi artıq yekunlaşıb</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomNotification;
