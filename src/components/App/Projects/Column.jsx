import PropTypes from "prop-types";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { IoCloseSharp } from "react-icons/io5";

const Column = ({ column, handleDeleteColumn }) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="min-w-[336px] bg-gray-100 p-4 rounded-lg shadow-md"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{column.name}</h2>
            <button
              onClick={() => handleDeleteColumn(column.id)}
              className="text-red-500"
            >
              <IoCloseSharp size={20} />
            </button>
          </div>
          {column.items && column.items.map((item, index) => (
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
