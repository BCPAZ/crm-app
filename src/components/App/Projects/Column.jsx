import { useState, memo } from "react";
import PropTypes from "prop-types";
import { Droppable } from "@hello-pangea/dnd";
import { IoAddSharp } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
import { HiTrash } from "react-icons/hi2";
import TaskCard from "./TaskCard";

const Column = ({ column, handleDeleteColumn, handleUpdateColumnName, handleAddTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(column.name);
  const [newTaskName, setNewTaskName] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleSave = () => {
    if (newName.trim() === "") return;
    handleUpdateColumnName(column.id, newName);
    setIsEditing(false);
  };

  const handleBlur = () => {
    handleSave();
  };

  const handleAddTaskClick = () => {
    setIsAddingTask(true);
  };

  const handleTaskSave = () => {
    if (newTaskName.trim() === "") return;
    handleAddTask(column.id, newTaskName);
    setNewTaskName("");
    setIsAddingTask(false);
  };

  const handleTaskNameChange = (e) => {
    setNewTaskName(e.target.value);
  };

  const handleTaskKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTaskSave();
    }
  };

  const handleTaskBlur = () => {
    setIsAddingTask(false);
    setNewTaskName("");
  };

  return (
    <Droppable droppableId={column.id} type="TASK">
      {(provided) => (
        <div
          className="min-w-[336px] bg-gray-100 p-4 rounded-xl"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="w-[25px] h-[25px] rounded-full flex items-center justify-center text-gray-500 bg-grey/20 font-bold text-sm">
                1
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={newName}
                  onChange={handleNameChange}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                  className="text-lg flex-1 p-2 font-semibold border-none bg-transparent rounded-lg focus:outline-black mx-2"
                />
              ) : (
                <h2
                  className="text-lg font-semibold cursor-pointer"
                  onClick={handleNameClick}
                >
                  {column.name}
                </h2>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleAddTaskClick}
                className="p-1 bg-black rounded-full text-white"
              >
                <IoAddSharp size={14} />
              </button>
              <button
                onClick={() => handleDeleteColumn(column.id)}
                className="hover:bg-red-500 hover:text-white rounded-full text-gray-400 p-1 transition-colors duration-300"
              >
                <HiTrash size={18} />
              </button>
              <button className="p-1 hover:bg-grey/20 rounded-full text-gray-400">
                <MdDragIndicator size={20} />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {column.items.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
          {isAddingTask && (
            <div className="mt-4 flex flex-col gap-2">
              <input
                type="text"
                value={newTaskName}
                onChange={handleTaskNameChange}
                onKeyDown={handleTaskKeyDown}
                onBlur={handleTaskBlur}
                placeholder="Add new task"
                className="w-full p-2 text-sm border border-grey/20 outline-none rounded-lg"
                autoFocus
              />
              <span className="text-xs text-gray-500 font-base">
                Press enter the create task
              </span>
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
};

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  handleDeleteColumn: PropTypes.func.isRequired,
  handleUpdateColumnName: PropTypes.func.isRequired,
  handleAddTask: PropTypes.func.isRequired,
};

export default memo(Column);
