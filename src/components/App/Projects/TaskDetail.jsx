import Selectbox from "@/components/common/Selectbox";
import { BiSolidLike } from "react-icons/bi";
import { HiTrash } from "react-icons/hi2";
import { IoMdMore } from "react-icons/io";
import Tabs from "./Tabs";
import { useDeleteTaskMutation, useGetTaskQuery } from "@/data/services/taskManagementService";

const TaskDetail = ({ selectedTaskId }) => {
  const { data: task = {} } = useGetTaskQuery(selectedTaskId, {
    skip: !selectedTaskId,
  });

  // TODO: delete modal
  const [deleteTask] = useDeleteTaskMutation();

  return (
    <aside className="min-w-[480px] fixed top-0 right-0 h-full bg-white shadow-lg overflow-y-auto">
      <header className="p-5 flex items-center justify-between gap-2">
        <Selectbox outline />
        <div className="flex items-center gap-5 text-gray-500">
          {/* <button>
            <BiSolidLike size={24} />
          </button> */}
          <button onClick={() => deleteTask(selectedTaskId)}>
            <HiTrash size={24} />
          </button>
          {/* <button>
            <IoMdMore size={24} />
          </button> */}
        </div>
      </header>
      <div className="w-full h-full">
        <Tabs task={task} />
      </div>
    </aside>
  );
};

export default TaskDetail;
