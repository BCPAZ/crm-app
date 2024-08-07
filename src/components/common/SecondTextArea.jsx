import PropTypes from "prop-types";

const SecondTextArea = ({placeholder, label}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-md text-gray-500 font-light">{label}</label>
      <textarea className="w-full outline-none min-h-24 resize-none p-4 rounded-lg text-sm border border-grey/20" placeholder={placeholder}/>
    </div>
  )
}

SecondTextArea.propTypes = {
  placeholder : PropTypes.string.isRequired,
  label : PropTypes.string.isRequired
}

export default SecondTextArea