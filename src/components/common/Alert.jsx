import { IoMdInformationCircle } from "react-icons/io";
import PropTypes from "prop-types";
const Alert = ({value}) => {
  return (
    <div className="flex items-center gap-2 bg-sky-300 p-3 rounded-lg">
      <IoMdInformationCircle size={24} color="white" />
      <p className="text-sm text-white">
        {value}
      </p>
    </div>
  )
}

Alert.propTypes = {
  value : PropTypes.string
}

export default Alert