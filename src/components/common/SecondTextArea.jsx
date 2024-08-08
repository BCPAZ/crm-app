import PropTypes from "prop-types";

const SecondTextArea = ({placeholder, label, column, solid}) => {
  return (
    <div className={`flex ${column ? 'flex-col' : 'flex-row items-center'} gap-2 w-full`}>
      <label className="text-sm text-gray-500 font-light">{label}</label>
      <textarea className={`w-full outline-none min-h-24 resize-none p-4 rounded-lg text-sm ${solid ? 'bg-grey/20' : 'border border-grey/20'}`} placeholder={placeholder}/>
    </div>
  )
}

SecondTextArea.propTypes = {
  placeholder : PropTypes.string.isRequired,
  label : PropTypes.string.isRequired,
  column : PropTypes.bool,
  solid : PropTypes.bool
}

export default SecondTextArea