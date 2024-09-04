import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { IoSend, IoCloudDownload } from "react-icons/io5";
import { MdLabelImportantOutline, MdLabelImportant } from "react-icons/md";
import { HiTrash } from "react-icons/hi2";
import { LuMoreVertical } from "react-icons/lu";
import { IoMdAttach } from "react-icons/io";
import { FileIcon, defaultStyles } from "react-file-icon";
import {
  useGetMailDetailQuery,
  useToggleStarredStatusMutation,
  useToggleImportantStatusMutation,
  useSendMailMutation,
  useSoftDeleteMutation,
  useForceDeleteMutation,
} from "@/data/services/mailService";
import { LuUserCircle2 } from "react-icons/lu";
import Spinner from "@/components/common/Spinner";
import SecondTextArea from "@/components/common/SecondTextArea";
import useToast from "@/hooks/useToast";
import { Toaster } from "react-hot-toast";
import moment from "moment";

const MailDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useGetMailDetailQuery(id);
  const [toggleStarredStatus] = useToggleStarredStatusMutation();
  const [toggleImportantStatus] = useToggleImportantStatusMutation();
  const [
    sendMail,
    { isLoading: isSending, isError: sendError, isSuccess: sendSuccess },
  ] = useSendMailMutation();
  const [
    softDelete,
    { isError: softDeleteError, isSuccess: softDeleteSuccess },
  ] = useSoftDeleteMutation();
  const [
    forceDelete,
    { isError: forceDeleteError, isSuccess: forceDeleteSuccess },
  ] = useForceDeleteMutation();
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const endOfMessagesRef = useRef(null);
  const { showToast } = useToast();

  const mailControl = data?.default_mail;
  const mailDetail = data?.mails;

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleAttachmentChange = (e) => {
    console.log(e.target.files);
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  const handleSendMail = () => {
    if (!message.trim()) {
      showToast("Mesaj hissəsi boş ola bilməz!", "error");
      return;
    }
    sendMail({
      to: mailControl?.opponent.email,
      subject: "Re :" + mailControl?.subject,
      message,
      reply_id: mailControl.id,
      attachments,
    });
  };

  const handleDeleteEmail = () => {
    if (mailDetail.is_trashed) {
      forceDelete(id);
    } else {
      softDelete(id);
    }
  };

  const getFileExtension = (filename) => {
    return filename.split(".").pop();
  };

  const renderFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    const style = defaultStyles[ext] || defaultStyles["default"];

    return <FileIcon extension={ext} {...style} />;
  };

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mailDetail]);

  useEffect(() => {
    if (softDeleteSuccess) {
      showToast("Mesaj uğurlu şəkildə silindi", "success");
      refetch();
    }
  }, [softDeleteSuccess]);

  useEffect(() => {
    if (softDeleteError) {
      showToast("Mesaj silinə bilmədi", "error");
    }
  }, [softDeleteError]);

  useEffect(() => {
    if (forceDeleteSuccess) {
      showToast("Mesaj zibillərdən silindi", "success");
      refetch();
    }
  }, [forceDeleteSuccess]);

  useEffect(() => {
    if (forceDeleteError) {
      showToast("Mesaj zibildən silinə bilmədi", "error");
    }
  }, [forceDeleteError]);

  useEffect(() => {
    if (sendSuccess) {
      showToast("Mesaj uğurla göndərildi", "success");
      setMessage("");
      setAttachments([]);
    }
  }, [sendSuccess]);

  useEffect(() => {
    if (sendError) {
      showToast("Mesaj göndərilə bilmədi", "error");
    }
  }, [sendError]);

  const handleToggleStarred = () => {
    toggleStarredStatus({
      id: mailControl.id,
      is_starred: !mailControl.is_starred,
    }).then(() => refetch());
  };

  const handleToggleImportant = () => {
    toggleImportantStatus({
      id: mailControl.id,
      is_important: !mailControl.is_important,
    }).then(() => refetch());
  };

  const handleDownloadFile = () => {
    let link;
    mailDetail.attachments.forEach((attachment) => {
      link = document.createElement("a");
      link.href = attachment.path;
      link.download = attachment.name;
      link.target = "_blank";
      console.log(attachment, link);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (isError)
    return (
      <div className="w-full h-full flex items-center justify-center">
        Maillərin detalları yüklənilə bilmədi
      </div>
    );

  return (
    <div className="h-full relative">
      <Toaster />
      <div className="flex items-center justify-end w-full gap-3 py-3 border-b border-dashed border-gray-300/40">
        <button onClick={handleToggleStarred}>
          {mailControl.is_starred ? (
            <FaStar color="#FFAB00" size={20} />
          ) : (
            <FaRegStar color="#FFAB00" size={20} />
          )}
        </button>
        <button onClick={handleToggleImportant}>
          {mailControl.is_important ? (
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
      <div className="flex items-center justify-between py-5 border-b border-gray-300/50">
          <h1 className="w-auto text-md font-semibold">Re : {mailControl.subject}</h1>
          <span className="text-xs text-gray-500 font-medium">{moment(mailControl.created_at).format('DD MMM YYYY hh:mm a')}</span>
      </div>
      <div className="max-h-[55%] h-full overflow-y-scroll">
      {mailDetail.map((mail, index) => (
        <div className="p-4 border-b border-gray-200" key={index}>
          <div className="flex items-center gap-3 mb-2">
            {mail?.opponent?.avatar_url ? (
              <img
                className="w-[40px] h-[40px] rounded-full"
                src={mail.opponent.avatar_url}
                alt={mail.opponent.name}
              />
            ) : (
              <div className="w-[40px] h-[40px] flex items-center justify-center text-gray-500">
                <LuUserCircle2 size={30} />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm">{mail?.opponent?.name}</span>
                <span className="text-sm text-gray-400">
                  {`<${mail?.opponent?.email}>`}
                </span>
              </div>
              <span className="text-black text-xs">
                To : <span className="text-xs text-gray-400">{mail?.to}</span>
              </span>
            </div>
          </div>
          <div className="p-4 bg-grey/20 rounded-lg flex items-center justify-between">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center text-sm gap-2 text-gray-500">
                  <IoMdAttach size={18} />
                  <span>{mail?.attachments?.length} Fayllar</span>
                </div>
                <button
                  onClick={handleDownloadFile}
                  className="flex items-center gap-2 text-sm text-black font-semibold"
                >
                  <IoCloudDownload size={18} />
                  <span>Yüklə</span>
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {mail.attachments.map((attachment, index) => (
                  <div className="w-[20px] h-[20px]" key={index}>
                    {renderFileIcon(attachment.name)}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 h-auto  overflow-y-auto">
            <p className="text-sm whitespace-pre-wrap">{mail.message}</p>
          </div>
        </div>
      ))}
      <div ref={endOfMessagesRef} /> {/* Bu div ən son mesaja keçmək üçün referansdır */}
    </div>

      {/* {mailControl?.can_send_reply && ( */}
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
            Göndər <IoSend size={18} />
          </button>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default MailDetail;
