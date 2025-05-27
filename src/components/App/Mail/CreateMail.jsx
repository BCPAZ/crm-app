import { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineClose } from "react-icons/ai";
import { IoMdAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useSendMailMutation } from "@/data/services/mailService";
import useToast from "@/hooks/useToast";
import Spinner from "@/components/common/Spinner";

const CreateMail = ({ closeMailModal }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [cc, setCc] = useState([""]);
  const [bcc, setBcc] = useState([""]);
  const [attachments, setAttachments] = useState([]);
  const [
    sendMail,
    { isSuccess: mailSuccess, isError: mailError, isLoading: mailLoading },
  ] = useSendMailMutation();
  const { showToast } = useToast();

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  const handleCcChange = (index, value) => {
    const newCc = [...cc];
    newCc[index] = value;
    setCc(newCc);
  };

  const handleBccChange = (index, value) => {
    const newBcc = [...bcc];
    newBcc[index] = value;
    setBcc(newBcc);
  };

  const handleCcAdd = () => {
    setCc([...cc, ""]);
  };

  const handleBccAdd = () => {
    setBcc([...bcc, ""]);
  };

  const handleAttachmentChange = (event) => {
    setAttachments([...attachments, ...event.target.files]);
  };

  const handleSendMail = () => {
    const filteredCc = cc.filter((email) => email.trim() !== "");
    const filteredBcc = bcc.filter((email) => email.trim() !== "");

    sendMail({
      to,
      subject,
      message,
      cc: filteredCc,
      bcc: filteredBcc,
      attachments,
    });
  };

  useEffect(() => {
    if (mailSuccess) {
      showToast("Mail uğurlu şəkildə göndərildi", "success");

      closeMailModal();
    }
  }, [mailSuccess]);

  useEffect(() => {
    if (mailError) {
      showToast("Mail göndərilə bilmədi", "error");
    }
  }, [mailError]);

  return (
    <div
      className={clsx("bg-white rounded-xl shadow-lg overflow-hidden", {
        "w-[520px]": !isFullscreen,
        "w-full h-full fixed inset-0 z-50": isFullscreen,
      })}
    >
      <div className="bg-grey/20 p-4 flex items-center justify-between">
        <h1 className="text-sm font-medium">New message</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleFullscreen}
            className="text-gray-500 hover:bg-grey/20 p-1 rounded-lg"
          >
            <AiOutlineFullscreen size={20} />
          </button>
          <button
            onClick={closeMailModal}
            className="text-gray-500 hover:bg-grey/20 p-1 rounded-lg"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>
      </div>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between gap-5 px-4 py-3 border-b border-grey/20">
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full outline-none border-none text-sm"
            type="text"
            placeholder="To"
            autoComplete="off"
          />
          <div className="flex items-center gap-1">
            <button onClick={handleCcAdd} className="text-sm font-semibold">
              Cc
            </button>
            {cc.map((email, index) => (
              <input
                key={index}
                value={email}
                onChange={(e) => handleCcChange(index, e.target.value)}
                className="w-full outline-none border-none text-sm"
                type="text"
                placeholder={`Cc #${index + 1}`}
                autoComplete="off"
              />
            ))}
            <button onClick={handleBccAdd} className="text-sm font-semibold">
              Bcc
            </button>
            {bcc.map((email, index) => (
              <input
                key={index}
                value={email}
                onChange={(e) => handleBccChange(index, e.target.value)}
                className="w-full outline-none border-none text-sm"
                type="text"
                autoComplete="off"
                placeholder={`Bcc #${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="w-full px-4 py-3 border-b border-grey/20">
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full outline-none border-none text-sm"
            type="text"
            placeholder="Subject"
            autoComplete="off"
          />
        </div>
        <div className="px-4 py-3 flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`bg-grey/10 w-full ${
              isFullscreen ? "h-[75%]" : "h-[200px]"
            } outline-none p-2 text-sm rounded-lg border border-grey/20 resize-none`}
            placeholder="Write something awesome..."
            autoComplete="off"
          ></textarea>
          <div className="flex items-center justify-between mt-3 bg-white">
            <input
              type="file"
              multiple
              onChange={handleAttachmentChange}
              className="hidden"
              id="attachments"
              autoComplete="off"
            />
            <label
              htmlFor="attachments"
              className="cursor-pointer hover:bg-grey/20 rounded p-1"
            >
              <IoMdAttach size={20} />
            </label>
            <button
              onClick={handleSendMail}
              className="bg-green-700 p-3 rounded-lg text-white font-semibold flex items-center gap-3 text-sm"
            >
              Send {mailLoading ? <Spinner /> : <IoSend size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CreateMail.propTypes = {
  closeMailModal: PropTypes.func.isRequired,
};

export default CreateMail;
