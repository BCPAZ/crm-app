import PropTypes from 'prop-types';
import { FaEyeSlash } from 'react-icons/fa';

const Input = ({ type, placeholder, label, ...props }) => {
  return (
    <div className='flex flex-col relative'>
      <label className='text-xs font-semibold text-gray-500 absolute bg-white -top-3 p-1 left-4 w-fit'>
        {label}
      </label>
      <div className='w-full flex items-center justify-between p-4 rounded-lg text-sm border border-grey/20'>
        <input
          className='w-full outline-none h-full bg-transparent disabled:opacity-50'
          type={type}
          placeholder={placeholder}
          {...props}
        />
        {type === 'password' && (
          <button type='button'>
            <FaEyeSlash size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Input;
