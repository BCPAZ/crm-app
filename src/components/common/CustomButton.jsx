import { Link } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import PropTypes from "prop-types";
const CustomButton = ({ type, to, value, simple, functionality }) => {
  const commonClasses = "bg-black p-3 font-semibold text-white rounded-lg text-sm flex items-center gap-2";

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
      {value}
    </button>
  );
};

CustomButton.propTypes = {
  type : PropTypes.string.isRequired,
  to : PropTypes.string.isRequired,
  value : PropTypes.string.isRequired,
  simple : PropTypes.bool.isRequired,
  functionality : PropTypes.func.isRequired
}

export default CustomButton;
