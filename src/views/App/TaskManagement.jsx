import KanbanBoard from "@/components/App/Projects/KanbanBoard"
import { IoIosNotifications } from "react-icons/io";

const TaskManagement = () => {
  return (
    <section className="pb-[100px]">
      <div className="siteContainer">
        <div className="flex items-center gap-2 justify-between mt-5">
          <h2 className="text-2xl font-semibold">Layihəni təsdiqləmək</h2>
          <button className="text-white bg-black p-3 rounded-lg text-sm flex items-center gap-1"><IoIosNotifications size={18} />Bildiriş göndər</button>
        </div>
        <KanbanBoard />
      </div>
    </section>
  )
}

export default TaskManagement