import { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineClose } from "react-icons/ai";
import { IoMdAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import PropTypes from "prop-types";
import clsx from "clsx";

const CreateMail = ({ closeMailModal }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

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
            placeholder="Subject"
          />
        </div>
        <div className="px-4 py-3 flex-1">
          <textarea
            className={`bg-grey/10 w-full ${isFullscreen ? 'h-[75%]' : 'h-[200px]'} outline-none p-2 text-sm rounded-lg border border-grey/20 resize-none`}
            placeholder="Write something awesome..."
          ></textarea>
          <div className="flex items-center justify-between mt-3 bg-white">
            <button className="hover:bg-grey/20 rounded p-1">
              <IoMdAttach size={20} />
            </button>
            <button className="bg-green-700 p-3 rounded-lg text-white font-semibold flex items-center gap-3 text-sm">
              Send <IoSend size={18} />
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
