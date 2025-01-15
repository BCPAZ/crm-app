import React from "react";
import PropTypes from "prop-types";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Input = React.forwardRef(
  (
    {
      type,
      placeholder,
      name,
      label,
      value,
      onChange,
      onBlur,
      error,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setPasswordVisible] = React.useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible((prev) => !prev);
    };

    return (
      <div className="w-full">
        <div className="flex flex-col relative">
          <label className="text-xs font-semibold text-gray-500 absolute bg-white -top-3 p-1 left-4 w-fit">
            {label}
          </label>
          <div
            className={`w-full disabled:default: flex items-center justify-between p-4 rounded-lg text-sm border ${
              error ? "border-red-600" : "border-grey/20"
            }`}
          >
            <input
              className="w-full outline-none h-full bg-transparent disabled:opacity-50"
              type={type === "password" && isPasswordVisible ? "text" : type}
              placeholder={placeholder}
              autoComplete="off"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              disabled={disabled}
              name={name}
              {...props}
            />
            {type === "password" && (
              <button type="button" onClick={togglePasswordVisibility}>
                {isPasswordVisible ? (
                  <FaEye size={20} />
                ) : (
                  <FaEyeSlash size={20} />
                )}
              </button>
            )}
          </div>
          {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
};

export default Input;
