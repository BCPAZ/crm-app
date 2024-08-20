import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import PropTypes from "prop-types";
const GoBackButton = ({path}) => {
  return (
    <Link to={path} className="flex items-center gap-1 text-sm w-full text-start"><IoIosArrowRoundBack size={18}/>Geri qayıt</Link>
  )
}

GoBackButton.propTypes = {
  path : PropTypes.string.isRequired
}

export default GoBackButton