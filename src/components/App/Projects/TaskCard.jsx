import { memo } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { FaCommentDots } from "react-icons/fa6";
import { CgAttachment } from "react-icons/cg";
import PropTypes from "prop-types";
import High from "@/assets/icons/Kanban/high.svg";
import Medium from "@/assets/icons/Kanban/medium.svg";
import Low from "@/assets/icons/Kanban/low.svg";
import { MdOutlineTimer } from "react-icons/md";

const TaskCard = ({ task, index, handleDeleteTask, setSelectedTaskId }) => {
  const checkPriority = (priority) => {
    if (priority === "HIGH") {
      return High;
    } else if (priority === "MEDIUM") {
      return Medium;
    } else {
      return Low;
    }
  };

  const handleDueDate = (task) => {
    if (!task.due_date) return <span className="text-yellow-500 flex items-center gap-1 w-full"><MdOutlineTimer size={14}/>Deadline yoxdur</span>;
    const currentDate = new Date().getTime();
    const dueDate = new Date(task.due_date).getTime();
    const timeDiff = dueDate - currentDate;
  
    if (timeDiff < 0) return <span className="text-red-500 flex items-center gap-1 w-full"><MdOutlineTimer size={14}/>Vaxt bitib</span>;
    return `${Math.ceil(timeDiff / (1000 * 60 * 60 * 24))} gün qaldı`;
  };

  const dueDate = handleDueDate(task);

  return (
    <Draggable draggableId={`task-${task.id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-xl"
          onClick={() => setSelectedTaskId(task.id)}
        >
          <div className="flex flex-col">
            {/* {task.img && (
              <div className="h-[200px] overflow-hidden w-full p-2">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={task?.img}
                  alt={task?.name}
                />
              </div>
            )} */}
            <div className="flex items-center justify-between gap-3 px-5 py-2 w-full">
              {dueDate && <span className="text-xs  font-medium flex items-center gap-1 w-full text-green-500">{dueDate}</span>}
              <div className="w-full flex justify-end">
                  <img
                    className="w-[25px]"
                    src={checkPriority(task.priority)}
                    alt="Priority Level"
                  />
                </div>
              </div>
            <div className="pb-5 px-5 mt-2">
              <h3 className="text-md font-bold">{task.name}</h3>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 text-gray-500 text-sm font-semibold">
                    <FaCommentDots size={14} />
                    <span>{task.comments_count}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 text-sm font-semibold">
                    <CgAttachment size={14} />
                    <span>{task.attachments_count}</span>
                  </button>
                </div>
                <div className="flex items-center">
                  {task.appointed_users?.map((user, index) => (
                    <div
                      className="w-[25px] h-[25px] rounded-full overflow-hidden border border-white"
                      key={index}
                    >
                      <img
                        className="w-full h-full object-cover object-center"
                        src={user?.img}
                        alt={user?.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string,
    priority: PropTypes.string,
    comments: PropTypes.array,
    content: PropTypes.string,
    attachments: PropTypes.arrayOf(PropTypes.string),
    selectedUsers: PropTypes.arrayOf(
      PropTypes.shape({
        img: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }),
  index: PropTypes.number,
  handleDeleteTask: PropTypes.func,
  setSelectedTaskId: PropTypes.any,
};

export default memo(TaskCard);
