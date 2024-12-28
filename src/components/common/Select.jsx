import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import PropTypes from "prop-types";

function Select({ label, column, absolute, options = [], value, onChange }) {
  const [selectedOption, setSelectedOption] = useState(value || '');

  useEffect(() => {
    if (value !== null) {
      setSelectedOption(value);
    }
  }, [value]);

  const handleChange = (selected) => {
    const newValue = selected.id; 
    setSelectedOption(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const validOptions = Array.isArray(options) ? options : [];

  return (
    <Listbox
      as="nav"
      className="relative"
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
          {validOptions.find(option => option.id === selectedOption)?.name || 'Seçin...'}
          <MdKeyboardArrowDown size={20} />
        </ListboxButton>
      </div>
      <ListboxOptions
        className="p-4 bg-white shadow-lg absolute top-[100%] h-[250px] overflow-y-scroll z-20 left-0 w-full outline-none rounded-xl"
      >
        {validOptions.map((option) => (
          <ListboxOption
            key={option.id}
            value={option}
            className="hover:bg-blue-100 p-2 rounded-md text-sm cursor-pointer text-black"
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
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
  })),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  onChange: PropTypes.func,
  mode: PropTypes.oneOf(['id', 'object']),
}

export default Select;
