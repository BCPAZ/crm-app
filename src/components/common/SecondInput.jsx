import PropTypes from "prop-types";
const SecondInput = ({
  label,
  placeholder,
  type,
  column,
  onChange,
  value,
  name,
  error,
  ...props
}) => {
  return (
    <div className="w-full">
      <div
        className={`flex ${
          column ? "flex-col gap-2" : "flex-row items-center gap-x-2"
        }`}
      >
        <label className="text-sm font-light text-gray-500 w-fit">
          {label}
        </label>
        <div className="w-full flex items-center justify-between p-4 rounded-lg text-sm border border-grey/20">
          <input
            autoComplete="off"
            onChange={onChange}
            className="w-full outline-none h-full bg-transparent"
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            {...props}
          />
        </div>
        {error && <p className="text-red-600 text-xs">{error}</p>}
      </div>
    </div>
  );
};

SecondInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  column: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.any,
  name: PropTypes.string,
};

export default SecondInput;
