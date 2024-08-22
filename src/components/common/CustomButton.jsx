import { Link } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
const CustomButton = ({ type, to, value, simple, functionality, isLoading }) => {
  const commonClasses = "bg-black p-3 font-semibold text-white rounded-lg text-sm flex items-center justify-center gap-2";

  if (type === 'link') {
    return (
      <Link to={to} className={commonClasses}>
        {!simple && <IoAddSharp size={18} />}
        {value}
      </Link>
    );
  }

  return (
    <button onClick={functionality} className={commonClasses}>
      {!simple && <IoAddSharp size={18} />}
      {isLoading && <Spinner />}
      {value}
    </button>
  );
};

CustomButton.propTypes = {
  type : PropTypes.string,
  to : PropTypes.string,
  value : PropTypes.string.isRequired,
  simple : PropTypes.bool,
  functionality : PropTypes.func,
  isLoading : PropTypes.bool
}

export default CustomButton;
