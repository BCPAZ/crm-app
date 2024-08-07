import PropTypes from "prop-types";
const SecondInput = ({label,placeholder,type}) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-md font-light text-gray-500 w-fit"
      >
        {label}
      </label>
      <div className="w-full flex items-center justify-between p-4 rounded-lg text-sm border border-grey/20">
        <input
          className="w-full outline-none h-full bg-transparent"
          type={type}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

SecondInput.propTypes = {
  label : PropTypes.string.isRequired,
  type : PropTypes.string.isRequired,
  placeholder : PropTypes.string.isRequired
}

export default SecondInput