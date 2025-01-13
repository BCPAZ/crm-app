import KanbanBoard from "@/components/App/Projects/KanbanBoard"
import { IoIosNotifications } from "react-icons/io";
import { useSendNotificationToProjectMutation } from "@/data/services/projectService";
import { useEffect } from "react";
import useToast from "@/hooks/useToast";
import Spinner from "@/components/common/Spinner";
import { Toaster } from "react-hot-toast";
const TaskManagement = () => {
  const { showToast } = useToast();
  const [sendNotification, { isLoading, isSuccess, isError }] = useSendNotificationToProjectMutation();
  const handleSendNotification = () => {
    sendNotification();
  }

  useEffect(() => {
    if (isSuccess) {
      showToast("Bildiriş uğurlu şəkildə göndərildi", 'success')
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast("İstifadəçilərə artıq bildiriş göndərilib", 'error');
    }
  }, [isError]);

  return (
    <section className="pb-[100px]">
      <Toaster />
      <div className="siteContainer">
        <div className="flex items-center gap-2 justify-between mt-5">
          <h2 className="text-2xl font-semibold">Layihəni təsdiqləmək</h2>
          <button onClick={handleSendNotification} className="text-white bg-black p-3 rounded-lg text-sm flex items-center gap-1"><IoIosNotifications size={18} />{isLoading ? <Spinner /> : "Bildiriş göndər"}</button>
        </div>
        <KanbanBoard />
      </div>
    </section>
  )
}

export default TaskManagement