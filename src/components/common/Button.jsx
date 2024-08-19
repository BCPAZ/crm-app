import PropTypes from 'prop-types';

const Button = ({ value, ...props }) => {
  // TODO: Spinner
  return (
    <button
      className='bg-secondary w-full text-white p-3 rounded-lg font-medium sm:text-md text-sm'
      {...props}
    >
      {value}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Button;
