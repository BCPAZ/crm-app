import { FaEyeSlash } from "react-icons/fa";
import PropTypes from "prop-types";

const AuthInput = ({ type, placeholder, label }) => {
  return (
    <div className="flex flex-col relative border">
      <label
        className="text-xs font-semibold text-gray-500 absolute bg-white -top-3 p-1 left-4 w-fit"
      >
        {label}
      </label>
      <div className="w-full flex items-center justify-between p-4 rounded-lg text-sm bg-gray-300/20">
        <input
          className="w-full outline-none h-full bg-transparent"
          type={type}
          placeholder={placeholder}
        />
        {type === "password" && (
          <button type="button">
            <FaEyeSlash size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

AuthInput.propTypes = {
  type : PropTypes.string.isRequired,
  placeholder : PropTypes.string.isRequired,
  label : PropTypes.string.isRequired
}

export default AuthInput;
