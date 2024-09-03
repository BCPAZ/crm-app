import PropTypes from 'prop-types';
import { FaRegCommentDots } from "react-icons/fa";
import { IoIosAttach } from "react-icons/io";

const TaskCard = ({ task }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between gap-3 py-[22px] border-b-2 border-grey/20">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between items-center gap-2 w-full">
            <span className="text-md text-black font-medium">{task.name}</span>
            <span className="text-xs text-gray-400">{task.priority}</span>
          </div>
          <div className='flex items-center gap-3'>
            <span className='flex items-center gap-2 text-sm font-medium text-gray-400'><FaRegCommentDots size={18}/> : {task.comments_count || 0}</span>
            <span className='flex items-center gap-2 text-sm font-medium text-gray-400'><IoIosAttach size={18}/> : {task.attachments_count || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    name: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    attachments_count : PropTypes.number,
    comments_count : PropTypes.number
  }).isRequired,
};

export default TaskCard;
