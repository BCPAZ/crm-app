import SecondTextArea from "@/components/common/SecondTextArea";
import { useParams } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { IoSend, IoCloudDownload } from "react-icons/io5";
import { HiTrash } from "react-icons/hi2";
import { LuMoreVertical } from "react-icons/lu";
import { IoMdAttach } from "react-icons/io";
import { useGetMailDetailQuery } from "@/data/services/mailService";
import { useToggleStarredStatusMutation } from "@/data/services/mailService";
import { LuUserCircle2 } from "react-icons/lu";
import Spinner from "@/components/common/Spinner";

const MailDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetMailDetailQuery(id);
  const [toggleStarredStatus] = useToggleStarredStatusMutation()

  const mailDetail = data?.default_mail;
  if (isLoading) return <div className="w-full h-full flex items-center justify-center"><Spinner /></div>;
  if (isError) return <div className="w-full h-full ">Error loading mail details</div>;

  const handleToggleStarred = () => {
    if(mailDetail) {
      toggleStarredStatus({id, is_starred : !mailDetail.is_starred});
    }
  }

  return (
    <div className="h-full relative">
      <div className="flex items-center justify-end w-full gap-3 py-3 border-b border-dashed border-gray-300/40">
        <button onClick={handleToggleStarred}>
          {mailDetail.is_starred ? (
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
        {
          mailDetail.opponent.avatar_url ? <img
          className="w-[40px] h-[40px] rounded-full"
          src={mailDetail.opponent.avatar_url}
          alt={mailDetail.opponent.name}
        /> : <div className="w-[40px] h-[40px] flex items-center justify-center text-gray-500">
        <LuUserCircle2 size={30}/>
      </div>
        }
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm">{mailDetail.opponent.name}</span>
            <span className="text-sm text-gray-400">
              {`<${mailDetail.opponent.email}>`}
            </span>
          </div>
          <span className="text-black text-xs">To : <span className="text-xs text-gray-400">{mailDetail.to}</span></span>
        </div>
      </div>
      <div className="p-4 bg-grey/20 rounded-lg flex items-center justify-between">
        <div className="flex items-center text-sm gap-2 text-gray-500">
          <IoMdAttach size={18}/>
          <span>{mailDetail.attachments?.length} Attachment</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-black font-semibold">
          <IoCloudDownload size={18}/>
          <span>Download</span>
        </div>
      </div>
      <div className="p-4 h-[261px] overflow-y-auto">
        <p className="text-sm whitespace-pre-wrap">{mailDetail.message}</p>
      </div>
      {
        mailDetail.can_send_reply && <div className="absolute bottom-0 left-0 w-full h-[250px] z-20 flex flex-col gap-3">
        <SecondTextArea solid placeholder="Write something awesome..." />
        <div className="flex items-center justify-between">
          <button className="hover:bg-gray-300 transition-all duration-300 rounded w-[25px] h-[25px] flex items-center justify-center"><IoMdAttach size={18}/></button>
          <button className="bg-green-700 p-3 rounded-lg text-white font-semibold flex items-center gap-3 text-sm">Send <IoSend size={18}/></button>
        </div>
      </div>
      }
    </div>
  );
};

export default MailDetail;
