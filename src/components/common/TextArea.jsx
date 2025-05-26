import PropTypes from "prop-types";
const TextArea = ({ placeholder, label, error, ...props }) => {
  return (
    <div className="flex flex-col relative w-full">
      <label className="text-xs font-semibold text-gray-500 absolute bg-white -top-3 p-1 left-4 w-fit">
        {label}
      </label>
      <textarea
        className="w-full outline-none min-h-24 resize-none p-4 rounded-lg text-sm border border-grey/20"
        {...props}
        placeholder={placeholder}
      ></textarea>
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
};

TextArea.propTypes = {
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default TextArea;
