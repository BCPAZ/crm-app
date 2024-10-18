import { Checkbox } from "@headlessui/react";
import { IoMdCheckmark } from "react-icons/io";
import { useState } from "react";
import PropTypes from "prop-types";
import { useToggleSubTaskMutation } from "@/data/services/taskManagementService";

const CheckboxElement = ({ subTask }) => {
  const [enabled, setEnabled] = useState(true);

  const [toggleSubTask] = useToggleSubTaskMutation();

  const handleToggle = () => {
    toggleSubTask({
      subTaskId: subTask?.id,
      is_completed: Boolean(subTask?.is_completed) ? 0 : 1,
    });
  };

  return (
    <div className="flex items-center gap-5">
      <Checkbox
        checked={Boolean(subTask?.is_completed)}
        onChange={handleToggle}
        className="group size-5 flex items-center justify-center rounded border border-grey bg-white/10 p-1 data-[checked]:bg-secondary data-[checked]:border-none cursor-pointer"
      >
        <IoMdCheckmark className="hidden size-4 fill-white group-data-[checked]:block" />
      </Checkbox>
      <label className="text-sm font-medium">{subTask?.content}</label>
    </div>
  );
};

CheckboxElement.propTypes = {
  label: PropTypes.string,
};

export default CheckboxElement;
