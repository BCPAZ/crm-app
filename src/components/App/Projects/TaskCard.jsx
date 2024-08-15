import { memo } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { FaCommentDots } from "react-icons/fa6";
import { CgAttachment } from "react-icons/cg";
import PropTypes from "prop-types";
import High from "@/assets/icons/Kanban/high.svg";
import Medium from "@/assets/icons/Kanban/medium.svg";
import Low from "@/assets/icons/Kanban/low.svg";

const TaskCard = ({ task, index }) => {
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
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded-xl"
        >
          <div className="flex flex-col">
            {task.img && (
              <div className="h-[200px] overflow-hidden w-full p-2">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={task?.img}
                  alt={task?.title}
                />
              </div>
            )}
            <div className="w-full flex justify-end px-5 mt-2">
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
                    <div
                      className="w-[25px] h-[25px] rounded-full overflow-hidden border border-white"
                      key={index}
                    >
                      <img
                        className="w-full h-full object-cover object-center"
                        src={user.img}
                        alt={user.name}
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
    id: PropTypes.string.isRequired,
    img: PropTypes.string,
    title: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    comments: PropTypes.array,
    attachments: PropTypes.arrayOf(PropTypes.string),
    selectedUsers: PropTypes.arrayOf(PropTypes.shape({
      img: PropTypes.string,
      name: PropTypes.string,
    })),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default memo(TaskCard);
