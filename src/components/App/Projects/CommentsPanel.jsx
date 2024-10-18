import SecondTextArea from "@/components/common/SecondTextArea";
import moment from "moment";
import { IoAttach } from "react-icons/io5";
import { BiSolidImageAdd } from "react-icons/bi";
import { useCreateCommentMutation } from "@/data/services/taskManagementService";
import { RiErrorWarningLine } from "react-icons/ri";
import { FileIcon, defaultStyles } from "react-file-icon";
import { useState } from "react";
import PropTypes from "prop-types";

const CommentsPanel = ({ task }) => {
  const [text, setText] = useState("");
  const [createComment] = useCreateCommentMutation();

  const handleCreateTextComment = () => {
    createComment({ data: { text }, taskId: task.id });
    setText("");
  };

  const getFileExtension = (filename) => {
    return filename.split(".").pop();
  };

  const renderFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    const style = defaultStyles[ext] || defaultStyles["default"];
    return <FileIcon extension={ext} {...style} />;
  };

  const handleFileDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openImageSelector = () => {
    const imageElement = document.createElement("input");
    imageElement.setAttribute("type", "file");
    imageElement.setAttribute("accept", "image/*");
    imageElement.addEventListener("change", (event) => {
      const file = event.target.files[0];
      createComment({
        data: { image: file },
        taskId: task.id,
      });
      imageElement.remove();
    });

    imageElement.click();
  };

  const openFileSelector = () => {
    const fileElement = document.createElement("input");
    fileElement.setAttribute("type", "file");
    fileElement.addEventListener("change", (event) => {
      const file = event.target.files[0];
      createComment({
        data: { attachment: file },
        taskId: task.id,
      });
      fileElement.remove();
    });

    fileElement.click();
  };

  return (
    <section className="md:w-[440px] w-full h-full">
      <div className="w-full h-[100%] relative">
        <div className="flex flex-col gap-10 min-h-[720px] overflow-y-auto">
          {task.comments.length > 0 ? (
            task.comments.map((comment, index) => (
              <div className="flex gap-x-5" key={index}>
                <div className="w-[40px] h-[40px] flex items-center justify-center overflow-hidden">
                  <img
                    src={comment.user?.avatar_url || 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg'}
                    className="w-full h-full object-cover rounded-full select-none"
                    alt=""
                  />
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-md font-medium">{comment?.user?.name}</h4>
                    <span className="text-sm text-gray-400 font-medium">
                      {moment(comment.created_at).fromNow()}
                    </span>
                  </div>
                  {comment.type === "MESSAGE" && (
                    <div className="w-full">
                      <p className="w-full text-sm text-gray-500 font-base">
                        {comment.content}
                      </p>
                    </div>
                  )}
                  {comment.type === "IMAGE" && (
                    <div className="w-full max-h-[250px] overflow-hidden rounded-xl select-none">
                      <img
                        className="w-full h-full object-cover"
                        src={comment.content_url}
                        alt={comment.content}
                      />
                    </div>
                  )}
                  {comment.type === "FILE" && (
                    <div 
                      className="select-none flex items-center gap-3 cursor-pointer"
                      onClick={() => handleFileDownload(comment.content_url)}
                    >
                      <span className="w-[25px]">{renderFileIcon(comment.content_url)}</span>
                      <span className="text-sm">İstifadə ediləbilən fayl</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="min-h-[450px] flex items-center justify-center flex-col">
              <RiErrorWarningLine size={36} />
              <span>Hər hansı bir rəy yoxdur</span>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-white min-h-[30%] py-2 gap-2">
          <div className="w-full flex flex-col gap-3">
            <div className="h-auto">
              <SecondTextArea
                placeholder="Mesaj yazın"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="flex items-center w-full justify-between">
              <div className="flex items-center gap-2">
                <button className="text-gray-500" onClick={openImageSelector}>
                  <BiSolidImageAdd size={24} />
                </button>
                <button className="text-gray-500" onClick={openFileSelector}>
                  <IoAttach size={24} />
                </button>
              </div>
              <button
                className="p-3 rounded-lg bg-black text-sm font-semibold text-white"
                onClick={handleCreateTextComment}
              >
                Rəy bildirin
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


CommentsPanel.propTypes = {
  task : PropTypes.any
}

export default CommentsPanel;
