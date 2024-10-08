import CheckboxElement from "@/components/common/CheckboxElement";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";

const SubtasksPanel = ({ task }) => {
  const [newSubtask, setNewSubtask] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      console.log("Yeni Subtask:", newSubtask);
      setNewSubtask("");
      setIsAdding(false);
    }
  };

  return (
    <section className="w-full h-full">
      <div className="flex flex-col gap-2">
        <h6 className="text-sm text-black font-base">
          {task?.sub_tasks?.length} of {task?.total_sub_tasks || 0}
        </h6>
        <div className="w-full h-2 rounded-full bg-secondary/20 relative">
          <div
            className="w-[75%] h-full rounded-full absolute top-0 left-0 bg-secondary"
            style={{
              width: `${(task?.sub_tasks?.length / (task?.total_sub_tasks || 1)) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-6">
        {task?.sub_tasks?.map((sub_task, index) => (
          <CheckboxElement key={index} label={sub_task?.content} />
        ))}
        {isAdding && (
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              placeholder="Yeni alt tapşırıq yaradın"
              className="border rounded-lg p-2 w-full text-sm outline-black"
            />
            <button
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
        onClick={() => setIsAdding((prev) => !prev)}
      >
        <IoMdAdd size={20} />
        {isAdding ? "Cancel" : "Create Task"}
      </button>
    </section>
  );
};

export default SubtasksPanel;
