import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import PropTypes from "prop-types";

function Select({ label, column, absolute, options, value, onChange }) {
  const [selectedOption, setSelectedOption] = useState(value);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    onChange(selected);
  };

  return (
    <Listbox
      as="nav"
      className={"relative"}
      value={selectedOption}
      onChange={handleChange}
    >
      <div className={`flex ${column ? 'flex-col' : 'flex-row items-center'} gap-2`}>
        {label && (
          <label
            className={`text-sm font-base text-gray-500 ${absolute ? "text-xs font-semibold text-gray-500 absolute bg-white -top-3 p-1 left-4 w-fit" : "text-sm font-base text-gray-500"}`}
            htmlFor=""
          >
            {label}
          </label>
        )}
        <ListboxButton className="w-full border border-grey/20 text-gray-500 text-start p-4 rounded-lg text-sm flex items-center justify-between">
          {selectedOption?.name || 'Select...'}
          <MdKeyboardArrowDown size={20} />
        </ListboxButton>
      </div>
      <ListboxOptions
        className="p-4 bg-white shadow-lg absolute top-[100%] h-[250px] overflow-y-scroll z-20 left-0 w-full outline-none rounded-xl"
      >
        {options.map((option) => (
          <ListboxOption
            key={option.id}
            value={option}
            className="data-[focus]:bg-blue-100 p-2 rounded-md text-sm"
          >
            {option.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  column: PropTypes.bool,
  absolute: PropTypes.bool,
  options: PropTypes.array,
  value: PropTypes.object,
  onChange: PropTypes.func,
}

export default Select;
