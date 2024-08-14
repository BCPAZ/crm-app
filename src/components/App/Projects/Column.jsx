import PropTypes from "prop-types";
import { Droppable } from "@hello-pangea/dnd";
import { IoAddSharp } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";
import { HiTrash } from "react-icons/hi2";

import kanbanData from "@/mocks/kanbanData";
import TaskCard from "./TaskCard";
const Column = ({ column, handleDeleteColumn }) => {
  
  return (
    <Droppable droppableId={column.id} type="TASK">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="min-w-[336px] bg-gray-100 p-5 rounded-xl"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="w-[25px] h-[25px] rounded-full flex items-center justify-center text-gray-500 bg-grey/20 font-bold text-sm">
                1
              </span>
              <h2 className="text-lg font-semibold">{column.name}</h2>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1 bg-black rounded-full text-white">
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
          <div className="flex flex-col gap-4">
            {kanbanData &&
              kanbanData.map((task, index) => (
                <TaskCard task={task} key={index} index={index} />
              ))}
            {provided.placeholder}
          </div>
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
        title: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        priority: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  handleDeleteColumn: PropTypes.func.isRequired,
};

export default Column;
