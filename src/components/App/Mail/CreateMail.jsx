import { AiOutlineFullscreen, AiOutlineClose } from "react-icons/ai";
import { IoMdAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";

const CreateMail = () => {
  return (
    <div className="bg-white w-[520px] rounded-lg shadow-lg overflow-hidden">
      <div className="bg-grey/20 p-4 flex items-center justify-between">
        <h1 className="text-sm font-medium">New message</h1>
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:bg-grey/20 p-1 rounded-lg">
            <AiOutlineFullscreen size={20} />
          </button>
          <button className="text-gray-500 hover:bg-grey/20 p-1 rounded-lg">
            <AiOutlineClose size={20} />
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between gap-5 px-4 py-3 border-b border-grey/20">
          <input
            className="w-full outline-none border-none text-sm"
            type="text"
            placeholder="To"
          />
          <div className="flex items-center gap-1">
            <button className="text-sm font-semibold">Cc</button>
            <button className="text-sm font-semibold">Bcc</button>
          </div>
        </div>
        <div className="w-full px-4 py-3 border-b border-grey/20">
          <input
            className="w-full outline-none border-none text-sm"
            type="text"
            placeholder="To"
          />
        </div>
        <div className="px-4 py-3">
          <textarea className="bg-grey/10 w-full h-[150px] outline-none p-2 text-sm rounded-lg border border-grey/20 resize-none" placeholder="Write something awesome..."></textarea>
        </div>
        <div className="flex items-center justify-between p-4">
          <button className="hover:bg-grey/20 rounded p-1"><IoMdAttach size={20}/></button>
          <button className="bg-green-700 p-3 rounded-lg text-white font-semibold flex items-center gap-3 text-sm">Send <IoSend size={18}/></button>
        </div>
      </div>
    </div>
  );
};

export default CreateMail;
