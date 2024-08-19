import { FaPen } from 'react-icons/fa';
const SendInvoice = ({ openUserModal }) => {
  return (
    <div className='relative grid md:grid-cols-2 grid-cols-1 w-full'>
      {/* <div className='absolute left-[50%] translate-x-[-50%] md:flex hidden items-center'>
        <div className='w-0.5 h-full bg-gray-200 mx-auto'></div>
      </div> */}
      <div className='flex flex-col w-full px-10 md:border-r border-gray-200'>
        <div className='flex items-center justify-between gap-3'>
          <h1 className='text-lg text-gray-400 font-semibold'>From:</h1>
          <button onClick={openUserModal} className='text-gray-500 cursor-pointer' type='button'>
            <FaPen size={20} />
          </button>
        </div>
        <div className='flex flex-col gap-2 text-sm mt-2'>
          <h3 className='text-black font-medium'>Jayvion Simon</h3>
          <p>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</p>
          <span>+1 202-555-0143</span>
        </div>
      </div>
      <div className='flex flex-col w-full px-10'>
        <div className='flex items-center justify-between gap-3'>
          <h1 className='text-lg text-gray-400 font-semibold'>To:</h1>
          <button className='text-gray-500 cursor-pointer' type='button'>
            <FaPen size={20} />
          </button>
        </div>
        <div className='flex flex-col gap-2 text-sm mt-2'>
          <h3 className='text-black font-medium'>Jayvion Simon</h3>
          <p>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</p>
          <span>+1 202-555-0143</span>
        </div>
      </div>
    </div>
  );
};

export default SendInvoice;
