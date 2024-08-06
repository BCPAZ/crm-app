import PropTypes from "prop-types";

const Button = ({value}) => {
  return (
    <button className="bg-secondary w-full text-white p-3 rounded-lg font-bold mb-5">{value}</button>
  )
}

Button.propTypes = {
  value : PropTypes.string.isRequired
}

export default Button