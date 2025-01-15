import CheckboxElement from "@/components/common/CheckboxElement";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import PropTypes from "prop-types";
import { useCreateSubTaskMutation } from "@/data/services/taskManagementService";
const SubtasksPanel = ({ task }) => {
  const [newSubtask, setNewSubtask] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const [createSubTask, { isLoading }] = useCreateSubTaskMutation();

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      createSubTask({
        taskId: task.id,
        content: newSubtask,
      });
      setNewSubtask("");
    }
  };

  const completedTaskCount = task?.sub_tasks?.filter(
    (subTask) => subTask.is_completed
  ).length;

  return (
    <section className="w-full h-full">
      <div className="flex flex-col gap-2">
        <h6 className="text-sm text-black font-base">
          {completedTaskCount} of {task?.sub_tasks?.length || 0}
        </h6>
        <div className="w-full h-2 rounded-full bg-secondary/20 relative">
          <div
            className="w-[75%] h-full rounded-full absolute top-0 left-0 bg-secondary"
            style={{
              width: `${
                (completedTaskCount / (task?.sub_tasks?.length || 1)) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-6">
        {task?.sub_tasks?.map((sub_task, index) => (
          <CheckboxElement key={index} subTask={sub_task} />
        ))}
        {isAdding && (
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              placeholder="Yeni alt tapşırıq yaradın"
              className="border rounded-lg p-2 w-full text-sm outline-black"
              autoComplete="off"
            />
            <button
              disabled={isLoading}
              className="p-2 rounded-lg bg-secondary text-white text-sm font-semibold"
              onClick={handleAddSubtask}
            >
              Yarat
            </button>
          </div>
        )}
      </div>
      <button
        className="p-2 rounded-lg border text-sm font-semibold flex items-center gap-1 mt-6"
        onClick={() => setIsAdding(!isAdding)}
      >
        <IoMdAdd size={20} />
        {isAdding ? "Cancel" : "Create Task"}
      </button>
    </section>
  );
};

SubtasksPanel.propTypes = {
  task: PropTypes.any,
};

export default SubtasksPanel;
