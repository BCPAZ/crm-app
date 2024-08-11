import { FaPen } from "react-icons/fa";
const SendInvoice = () => {
  return (
    <div className="relative grid grid-cols-2 gap-5 w-full">
      <div className="flex flex-col w-full px-6">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-lg text-gray-400 font-semibold">From:</h1>
          <button type="button" className="text-gray-500">
            <FaPen size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-2 text-sm mt-2">
          <h3 className="text-black font-medium">Jayvion Simon</h3>
          <p>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</p>
          <span>+1 202-555-0143</span>
        </div>
      </div>
      <div className="flex flex-col w-full px-6">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-lg text-gray-400 font-semibold">To:</h1>
          <button type="button" className="text-gray-500">
            <FaPen size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-2 text-sm mt-2">
          <h3 className="text-black font-medium">Jayvion Simon</h3>
          <p>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</p>
          <span>+1 202-555-0143</span>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center">
        <div className="w-0.5 h-full bg-gray-200 mx-auto"></div>
      </div>
    </div>
  );
};

export default SendInvoice;
