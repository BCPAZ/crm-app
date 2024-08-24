import PropTypes from "prop-types";

const SecondTextArea = ({
  placeholder,
  label,
  column,
  solid,
  onChange,
  value,
}) => {
  return (
    <div
      className={`flex ${
        column ? "flex-col" : "flex-row items-center"
      } gap-2 w-full h-full`}
    >
      {label && <label className="text-sm text-gray-500 font-light">{label}</label>}
      <textarea
        className={`w-full outline-none h-full resize-none p-4 rounded-lg text-sm ${
          solid ? "bg-grey/20" : "border border-grey/20"
        }`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

SecondTextArea.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  column: PropTypes.bool,
  solid: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SecondTextArea;
