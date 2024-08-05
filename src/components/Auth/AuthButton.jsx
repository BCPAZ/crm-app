import PropTypes from "prop-types";

const AuthButton = ({value}) => {
  return (
    <button className="bg-secondary w-full text-white p-3 rounded-lg font-bold mb-5">{value}</button>
  )
}

AuthButton.propTypes = {
  value : PropTypes.string.isRequired
}

export default AuthButton