import { useParams } from "react-router-dom";
import mails from "@/mocks/mails";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { HiTrash } from "react-icons/hi2";
import { LuMoreVertical } from "react-icons/lu";

const MailDetail = () => {
  const { id } = useParams();
  const selectedMail = mails.find((mail) => mail.id === parseInt(id));

  return (
    <div className="h-full">
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
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm">{selectedMail.opponent.name}</span>
            <span className="text-sm text-gray-400">
              {`<${selectedMail.opponent.email}>`}
            </span>
          </div>
          <span className="text-black text-xs">To : <span className="text-xs text-gray-400">{selectedMail.to}</span></span>
        </div>
      </div>
    </div>
  );
};

export default MailDetail;
