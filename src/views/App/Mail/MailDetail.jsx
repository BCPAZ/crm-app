import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { IoSend, IoCloudDownload } from "react-icons/io5";
import { MdLabelImportantOutline, MdLabelImportant } from "react-icons/md";
import { HiTrash } from "react-icons/hi2";
import { LuMoreVertical } from "react-icons/lu";
import { IoMdAttach } from "react-icons/io";
import {
  useGetMailDetailQuery,
  useToggleStarredStatusMutation,
  useToggleImportantStatusMutation,
  useSendMailMutation,
  useSoftDeleteMutation,
} from "@/data/services/mailService";
import { LuUserCircle2 } from "react-icons/lu";
import Spinner from "@/components/common/Spinner";
import SecondTextArea from "@/components/common/SecondTextArea";
import useToast from "@/hooks/useToast";
import { Toaster } from "react-hot-toast";

const MailDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetMailDetailQuery(id);
  const [toggleStarredStatus, { isError: toggleStarError }] =
    useToggleStarredStatusMutation();
  const [toggleImportantStatus, { isError: toggleImportantError }] =
    useToggleImportantStatusMutation();
  const [
    sendMail,
    { isLoading: isSending, isError: sendError, isSuccess: sendSuccess },
  ] = useSendMailMutation();

  const [
    softDelete,
    {
      isError: softDeleteError,
      isSuccess: softDeleteSuccess,
    },
  ] = useSoftDeleteMutation();

  const [isStarred, setIsStarred] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    if (isSuccess && data) {
      const mailDetail = data.default_mail;
      if (mailDetail) {
        setIsStarred(mailDetail.is_starred ?? false);
        setIsImportant(mailDetail.is_important ?? false);
      }
    }
  }, [isSuccess, data]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const handleSendMail = () => {
    if (!message.trim()) {
      showToast("Mesaj hissəsi boş ola bilməz!", "error");
      return;
    }
    sendMail({
      to: mailDetail.to,
      subject: "Re :" + mailDetail.subject,
      message,
      reply_id: id,
      attachments,
    });
  };

  const handleDeleteEmail = () => {
    softDelete(id);
  }

  useEffect(() => {
    if(softDeleteSuccess){
      showToast('Mesaj uğurlu şəkildə silindi', 'success')
    }
  },[softDeleteSuccess])

  useEffect(() => {
    if(softDeleteError){
      showToast('Mesaj silinə bilmədi', 'error')
    }
  },[softDeleteError])

  useEffect(() => {
    if (sendSuccess) {
      setMessage("");
      setAttachments([]);
      showToast("Mesaj uğurla göndərildi", "success");
    }
  }, [sendSuccess]);

  useEffect(() => {
    if (sendError) {
      showToast("Mesaj göndərilə bilmədi", "error");
    }
  }, [sendError]);

  const handleToggleStarred = () => {
    const updatedStarredStatus = !isStarred;
    setIsStarred(updatedStarredStatus);
    toggleStarredStatus({ id, is_starred: updatedStarredStatus });

    if (updatedStarredStatus) {
      showToast("Seçilən poçt ulduzlananlara əlavə edildi.", "success");
    } else {
      showToast("Seçilən poçt ulduzlananlardan çıxarıldı.", "warning");
    }

    if (toggleStarError) {
      showToast("Poçtu ulduzlananlara əlavə etmək mümkün olmadı.", "error");
    }
  };

  const handleToggleImportant = () => {
    const updatedImportantStatus = !isImportant;
    setIsImportant(updatedImportantStatus);
    toggleImportantStatus({ id, is_important: updatedImportantStatus });

    if (updatedImportantStatus) {
      showToast("Seçilən poçt vaciblərə əlavə edildi.", "success");
    } else {
      showToast("Seçilən poçt vaciblərdən çıxarıldı.", "warning");
    }

    if (toggleImportantError) {
      showToast("Poçtu vaciblərə əlavə etmək mümkün olmadı.", "error");
    }
  };

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (isError)
    return <div className="w-full h-full">Error loading mail details</div>;

  const mailDetail = data?.default_mail;

  return (
    <div className="h-full relative">
      <Toaster />
      <div className="flex items-center justify-end w-full gap-3 py-3 border-b border-dashed border-gray-300/40">
        <button onClick={handleToggleStarred}>
          {isStarred ? (
            <FaStar color="#FFAB00" size={20} />
          ) : (
            <FaRegStar color="#FFAB00" size={20} />
          )}
        </button>
        <button onClick={handleToggleImportant}>
          {isImportant ? (
            <MdLabelImportant color="#FFAB00" size={20} />
          ) : (
            <MdLabelImportantOutline color="#FFAB00" size={20} />
          )}
        </button>
        <button onClick={handleDeleteEmail} className="text-gray-500">
          <HiTrash size={20} />
        </button>
        <button className="text-gray-500">
          <LuMoreVertical size={26} />
        </button>
      </div>
      <div className="p-4 flex items-center gap-3">
        {mailDetail?.opponent?.avatar_url ? (
          <img
            className="w-[40px] h-[40px] rounded-full"
            src={mailDetail.opponent.avatar_url}
            alt={mailDetail.opponent.name}
          />
        ) : (
          <div className="w-[40px] h-[40px] flex items-center justify-center text-gray-500">
            <LuUserCircle2 size={30} />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm">{mailDetail?.opponent?.name}</span>
            <span className="text-sm text-gray-400">
              {`<${mailDetail?.opponent?.email}>`}
            </span>
          </div>
          <span className="text-black text-xs">
            To : <span className="text-xs text-gray-400">{mailDetail?.to}</span>
          </span>
        </div>
      </div>
      <div className="p-4 bg-grey/20 rounded-lg flex items-center justify-between">
        <div className="flex items-center text-sm gap-2 text-gray-500">
          <IoMdAttach size={18} />
          <span>{mailDetail?.attachments?.length} Attachment</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-black font-semibold">
          <IoCloudDownload size={18} />
          <span>Download</span>
        </div>
      </div>
      <div className="p-4 h-[261px] overflow-y-auto">
        <p className="text-sm whitespace-pre-wrap">{mailDetail?.message}</p>
      </div>
      {mailDetail?.can_send_reply && (
        <div className="absolute bottom-0 left-0 w-full h-[250px] z-20 flex flex-col gap-3">
          <SecondTextArea
            solid
            placeholder="Write something awesome..."
            value={message}
            onChange={handleMessageChange}
          />
          <div className="flex items-center justify-between">
            <label className="hover:bg-gray-300 transition-all duration-300 rounded w-[25px] h-[25px] flex items-center justify-center cursor-pointer">
              <IoMdAttach size={18} />
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleAttachmentChange}
              />
            </label>
            <button
              className="bg-green-700 p-3 rounded-lg text-white font-semibold flex items-center gap-3 text-sm"
              onClick={handleSendMail}
              disabled={isSending}
            >
              Send <IoSend size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MailDetail;
