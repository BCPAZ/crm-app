import { Checkbox } from "@headlessui/react";
import { IoMdCheckmark } from "react-icons/io";
import { useState } from "react";
import PropTypes from "prop-types";

const CheckboxElement = ({label}) => {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="flex items-center gap-5">
      <Checkbox
      checked={enabled}
      onChange={setEnabled}
      className="group size-5 flex items-center justify-center rounded border border-grey bg-white/10 p-1 data-[checked]:bg-secondary data-[checked]:border-none cursor-pointer"
    >
      <IoMdCheckmark className="hidden size-4 fill-white group-data-[checked]:block" />
    </Checkbox>
    <label className="text-sm font-medium">{label}</label>
    </div>
  );
};

CheckboxElement.propTypes = {
  label : PropTypes.string
}

export default CheckboxElement;
