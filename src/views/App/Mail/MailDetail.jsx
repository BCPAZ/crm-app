import SecondTextArea from "@/components/common/SecondTextArea";
import mails from "@/mocks/mails";
import { useParams } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { IoSend, IoCloudDownload } from "react-icons/io5";
import { HiTrash } from "react-icons/hi2";
import { LuMoreVertical } from "react-icons/lu";
import { IoMdAttach } from "react-icons/io";

const MailDetail = () => {
  const { id } = useParams();
  const selectedMail = mails.find((mail) => mail.id === parseInt(id));

  return (
    <div className="h-full relative">
      <div className="flex items-center justify-end w-full gap-3 py-3 border-b border-dashed border-gray-300/40">
        <button>
          {selectedMail.is_starred ? (
            <FaStar color="#FFAB00" size={20} />
          ) : (
            <FaRegStar color="#FFAB00" size={20} />
          )}
        </button>
        <button className="text-gray-500">
          <HiTrash size={20} />
        </button>
        <button className="text-gray-500">
          <LuMoreVertical size={20} />
        </button>
      </div>
      <div className="p-4 flex items-center gap-3">
        <img
          className="w-[40px] h-[40px] rounded-full"
          src={selectedMail.opponent.avatar_url}
          alt={selectedMail.opponent.name}
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm">{selectedMail.opponent.name}</span>
            <span className="text-sm text-gray-400">
              {`<${selectedMail.opponent.email}>`}
            </span>
          </div>
          <span className="text-black text-xs">To : <span className="text-xs text-gray-400">{selectedMail.to}</span></span>
        </div>
      </div>
      <div className="p-4 bg-grey/20 rounded-lg flex items-center justify-between">
          <div className="flex items-center text-sm gap-2 text-gray-500">
            <IoMdAttach size={18}/>
            <span>{selectedMail.attachments.length} Attachment</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-black font-semibold">
            <IoCloudDownload size={18}/>
            <span>Download</span>
          </div>
      </div>
      <div className="p-4 h-[261px] overflow-y-auto">
          <p className="text-sm whitespace-pre-wrap">{selectedMail.message}</p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[250px] z-20 flex flex-col gap-3">
        <SecondTextArea solid placeholder="Write something awesome..." />
        <div className="flex items-center justify-between">
          <button className="hover:bg-gray-300 transition-all duration-300 rounded w-[25px] h-[25px] flex items-center justify-center"><IoMdAttach size={18}/></button>
          <button className="bg-green-700 p-3 rounded-lg text-white font-semibold flex items-center gap-3 text-sm">Send <IoSend size={18}/></button>
        </div>
      </div>
    </div>
  );
};

export default MailDetail;
