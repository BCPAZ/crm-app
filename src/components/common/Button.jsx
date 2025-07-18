import PropTypes from "prop-types";
import Spinner from "./Spinner";

const Button = ({ value, isLoading, disabled = false, ...props }) => {
  return (
    <button
      disabled={disabled}
      className={`bg-secondary w-full text-white p-3 rounded-lg font-medium sm:text-md text-sm flex items-center justify-center gap-2 ${
        disabled ? "opacity-50" : ""
      }`}
      {...props}
    >
      {isLoading && <Spinner />}
      {value}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

export default Button;
