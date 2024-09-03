import { FaPen } from 'react-icons/fa';
import PropTypes from "prop-types";

const SendInvoice = ({ openUserModal, from, to }) => {
  return (
    <div className='relative grid md:grid-cols-2 grid-cols-1 gap-10 w-full'>
      <div className='flex flex-col w-full md:px-10 px-3 md:border-r border-gray-200'>
        <div className='flex items-center justify-between gap-3'>
          <h1 className='text-lg text-gray-400 font-semibold'>Kimdən:</h1>
          <button
            onClick={() => openUserModal('from')}
            className='text-gray-500 cursor-pointer'
            type='button'
          >
            <FaPen size={20} />
          </button>
        </div>
        <div className='flex flex-col gap-2 text-sm mt-2'>
          <h3 className='text-black font-medium'>{from.name || 'N/A'}</h3>
          <p>{from.address || 'N/A'}</p>
          <span>{from.phone || 'N/A'}</span>
        </div>
      </div>

      <div className='flex flex-col w-full md:px-10 px-3'>
        <div className='flex items-center justify-between gap-3'>
          <h1 className='text-lg text-gray-400 font-semibold'>Kimə:</h1>
          <button
            onClick={() => openUserModal('to')}
            className='text-gray-500 cursor-pointer'
            type='button'
          >
            <FaPen size={20} />
          </button>
        </div>
        <div className='flex flex-col gap-2 text-sm mt-2'>
          <h3 className='text-black font-medium'>{to.name || 'N/A'}</h3>
          <p>{to.address || 'N/A'}</p>
          <span>{to.phone || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

SendInvoice.propTypes = {
  openUserModal: PropTypes.func.isRequired,
  from: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string
  }).isRequired,
  to: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string
  }).isRequired,
};

export default SendInvoice;
