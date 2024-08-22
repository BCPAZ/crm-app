import { IoMdInformationCircle } from "react-icons/io";
import PropTypes from "prop-types";
const Alert = ({value , type}) => {
  return (
    <div className={`flex items-center gap-2 ${type === 'danger' && 'bg-red-600'} ${type === 'primary' && 'bg-sky-600'} p-3 rounded-lg`}>
      <IoMdInformationCircle size={24} color="white" />
      <p className="text-sm text-white">
        {value}
      </p>
    </div>
  )
}

Alert.propTypes = {
  value : PropTypes.string,
  type : PropTypes.string
}

export default Alert