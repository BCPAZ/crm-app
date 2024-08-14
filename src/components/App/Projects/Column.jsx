import PropTypes from "prop-types";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { IoAddSharp } from "react-icons/io5";
import { CgAttachment } from "react-icons/cg";
import { MdDragIndicator } from "react-icons/md";
import { HiTrash } from "react-icons/hi2";
import { FaCommentDots } from "react-icons/fa6";
import High from "@/assets/icons/Kanban/high.svg";
import Medium from "@/assets/icons/Kanban/medium.svg";
import Low from "@/assets/icons/Kanban/low.svg";
import kanbanData from "@/mocks/kanbanData";
const Column = ({ column, handleDeleteColumn }) => {
  const checkPriority = (priority) => {
    if (priority === "High") {
      return High;
    } else if (priority === "Medium") {
      return Medium;
    } else {
      return Low;
    }
  };
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
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white rounded-xl"
                    >
                      <div className="flex flex-col">
                        <div className="h-[200px] overflow-hidden w-full p-2">
                          <img
                            className="w-full h-full object-cover rounded-lg"
                            src={task.img}
                            alt={task.title}
                          />
                        </div>
                        <div className="w-full flex justify-end px-5">
                          <img
                            className="w-[25px]"
                            src={checkPriority(task.priority)}
                            alt="Priority Level"
                          />
                        </div>
                        <div className="pb-5 px-5 mt-2">
                          <h3 className="text-md font-bold">{task.title}</h3>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <button className="flex items-center gap-1 text-gray-500 text-sm font-semibold">
                                <FaCommentDots size={14} />
                                <span>{task.comments?.length}</span>
                              </button>
                              <button className="flex items-center gap-1 text-gray-500 text-sm font-semibold">
                                <CgAttachment size={14} />
                                <span>{task.attachments?.length}</span>
                              </button>
                            </div>
                            <div className="flex items-center">
                              {task.selectedUsers?.map((user, index) => (
                                <div className="w-[25px] h-[25px] rounded-full overflow-hidden border border-white" key={index}>
                                  <img className="w-full h-full object-cover object-center" src={user.img} alt={user.name} />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
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
