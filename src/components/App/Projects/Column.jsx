import PropTypes from "prop-types";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { IoAddSharp } from "react-icons/io5";
import { LuMoreHorizontal } from "react-icons/lu";
import { MdDragIndicator } from "react-icons/md";

const Column = ({ column, handleDeleteColumn }) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="min-w-[336px] bg-gray-100 p-4 rounded-xl"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="w-[25px] h-[25px] rounded-full flex items-center justify-center text-gray-500 bg-grey/20 font-bold text-sm">1</span>
              <h2 className="text-lg font-semibold">{column.name}</h2>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleDeleteColumn(column.id)}
                className="p-1 bg-black rounded-full text-white"
              >
                <IoAddSharp size={14} />
              </button>
              <button className="p-1 hover:bg-grey/20 rounded-full text-gray-400">
                <LuMoreHorizontal size={18} />
              </button>
              <button className="p-1 hover:bg-grey/20 rounded-full text-gray-400">
                <MdDragIndicator size={20} />
              </button>
            </div>
          </div>
          {column.items &&
            column.items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white p-2 mb-2 rounded shadow"
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
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
};

export default Column;
