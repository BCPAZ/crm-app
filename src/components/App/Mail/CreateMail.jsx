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
  const [cc, setCc] = useState([""]); // default to an array with one empty string
  const [bcc, setBcc] = useState([""]); // default to an array with one empty string
  const [attachments, setAttachments] = useState([]);
  const [sendMail, { isSuccess, isError, isLoading }] = useSendMailMutation();
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
    setCc([...cc, ""]); // Add a new empty field
  };

  const handleBccAdd = () => {
    setBcc([...bcc, ""]); // Add a new empty field
  };

  const handleAttachmentChange = (event) => {
    setAttachments([...attachments, ...event.target.files]);
  };

  const handleSendMail = () => {
    // Remove empty CC and BCC values
    const filteredCc = cc.filter(email => email.trim() !== "");
    const filteredBcc = bcc.filter(email => email.trim() !== "");

    sendMail({
      to,
      subject,
      message,
      cc: filteredCc,
      bcc: filteredBcc,
      attachments
    });
  };

  useEffect(() => {
    if (isSuccess) {
      showToast('Mail uğurlu şəkildə göndərildi', 'success');
      closeMailModal(); // Close modal on success
    }
  }, [isSuccess, showToast, closeMailModal]);

  useEffect(() => {
    if (isError) {
      showToast('Mail göndərilə bilmədi', 'error');
    }
  }, [isError, showToast]);

  return (
    <div
      className={clsx(
        "bg-white rounded-xl shadow-lg overflow-hidden",
        {
          "w-[520px]": !isFullscreen,
          "w-full h-full fixed inset-0 z-50": isFullscreen,
        }
      )}
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
          />
          <div className="flex items-center gap-1">
            <button onClick={handleCcAdd} className="text-sm font-semibold">Cc</button>
            {cc.map((email, index) => (
              <input
                key={index}
                value={email}
                onChange={(e) => handleCcChange(index, e.target.value)}
                className="w-full outline-none border-none text-sm"
                type="text"
                placeholder={`Cc #${index + 1}`}
              />
            ))}
            <button onClick={handleBccAdd} className="text-sm font-semibold">Bcc</button>
            {bcc.map((email, index) => (
              <input
                key={index}
                value={email}
                onChange={(e) => handleBccChange(index, e.target.value)}
                className="w-full outline-none border-none text-sm"
                type="text"
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
          />
        </div>
        <div className="px-4 py-3 flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`bg-grey/10 w-full ${isFullscreen ? 'h-[75%]' : 'h-[200px]'} outline-none p-2 text-sm rounded-lg border border-grey/20 resize-none`}
            placeholder="Write something awesome..."
          ></textarea>
          <div className="flex items-center justify-between mt-3 bg-white">
            <input
              type="file"
              multiple
              onChange={handleAttachmentChange}
              className="hidden"
              id="attachments"
            />
            <label htmlFor="attachments" className="cursor-pointer hover:bg-grey/20 rounded p-1">
              <IoMdAttach size={20} />
            </label>
            <button
              onClick={handleSendMail}
              className="bg-green-700 p-3 rounded-lg text-white font-semibold flex items-center gap-3 text-sm"
            >
              Send {isLoading ? <Spinner /> : <IoSend size={18} />}
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
