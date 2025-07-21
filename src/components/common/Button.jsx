import PropTypes from "prop-types";
import Spinner from "./Spinner";

const Button = ({ value, isLoading, disabled = false, children, ...props }) => {
  return (
    <button
      disabled={disabled}
      className={`bg-secondary text-white p-3 rounded-lg font-medium sm:text-md text-sm flex items-center justify-center gap-2 ${
        disabled ? "opacity-50" : ""
      }`}
      {...props}
    >
      {isLoading && <Spinner />}
      {value ? value : children}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

export default Button;
