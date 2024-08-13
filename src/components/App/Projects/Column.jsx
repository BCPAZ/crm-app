import { IoAddSharp } from "react-icons/io5";
import { GoKebabHorizontal } from "react-icons/go";
import { MdDragIndicator } from "react-icons/md";


const Column = () => {
  return (
    <div className="w-[336px] bg-column rounded-xl py-5 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-[25px] h-[25px] bg-grey/40 flex text-sm rounded-full items-center justify-center">
            3
          </span>
          <h1 className="text-lg font-bold">To do</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-[25px] h-[25px] bg-black text-white flex text-sm rounded-full items-center justify-center">
            <IoAddSharp size={18}/>
          </button>
          <button className="p-1 hover:bg-grey/20 rounded-full transition-all duration-300 text-gray-40"><GoKebabHorizontal size={18}/></button>
          <button className="p-1 hover:bg-grey/20 rounded-full transition-all duration-300 text-gray-40"><MdDragIndicator size={18}/></button>
        </div>
      </div>
    </div>
  );
};

export default Column;
