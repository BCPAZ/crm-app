import SecondTextArea from "@/components/common/SecondTextArea";
import moment from "moment";
import { IoAttach } from "react-icons/io5";
import { BiSolidImageAdd } from "react-icons/bi";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from "@/data/services/taskManagementService";
import { RiErrorWarningLine } from "react-icons/ri";
import { FileIcon, defaultStyles } from "react-file-icon";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { TbTrash } from "react-icons/tb";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import useToast from "@/hooks/useToast";

const CommentsPanel = ({ task }) => {
  const [text, setText] = useState("");
  const [createComment] = useCreateCommentMutation();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [deleteComment, { isError, isSuccess }] = useDeleteCommentMutation();
  const { showToast } = useToast();
  const handleCreateTextComment = () => {
    createComment({ data: { text }, taskId: task.id });
    setText("");
  };

  const openConfirmation = (id) => {
    setSelectedComment(id);
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  const getFileExtension = (filename) => {
    return filename.split(".").pop();
  };

  const handleDeleteComment = () => {
    if (selectedComment) {
      deleteComment({ id: selectedComment, taskId: task.id });
      closeConfirmation();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      showToast("Rəy uğurlu şəkildə silindi", "success");
      closeConfirmation();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast("Rəy silinə bilmədi", "error");
    }
  }, [isError]);

  const renderFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    const style = defaultStyles[ext] || defaultStyles["default"];
    return <FileIcon extension={ext} {...style} />;
  };

  // const handleFileDownload = (fileUrl) => {
  //   const link = document.createElement("a");
  //   link.href = fileUrl;
  //   link.download = fileUrl.split("/").pop();
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

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
      <ConfirmationModal
        title="Şərhi silmək istəyirsiniz?"
        showConfirmation={showConfirmation}
        closeConfirmationModal={closeConfirmation}
        handleDelete={handleDeleteComment}
      />
      <div className="w-full h-full relative">
        <div className="flex flex-col gap-8 h-3/4 overflow-y-scroll py-12">
          {task.comments.length > 0 ? (
            task.comments.map((comment, index) => (
              <div className="flex gap-x-5 p-2" key={index}>
                <div className="flex-1 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-[30px] h-[30px] flex items-center justify-center">
                        <img
                          src={
                            comment.user?.avatar_url ||
                            "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
                          }
                          className="w-full h-full object-cover rounded-full select-none"
                          alt=""
                        />
                      </div>
                      <h4 className="text-sm font-medium">
                        {comment?.user?.name}
                      </h4>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-gray-400 font-medium">
                        {moment(comment.created_at).fromNow()}
                      </span>
                      <button
                        onClick={() => openConfirmation(comment?.id)}
                        className="hover:bg-gray-300/20 p-2 cursor-pointer rounded-lg"
                      >
                        <TbTrash />
                      </button>
                    </div>
                  </div>
                  {comment.type === "MESSAGE" && (
                    <div className="w-full">
                      <p className="w-full text-xs text-gray-500">
                        {comment.content}
                      </p>
                    </div>
                  )}
                  {comment.type === "IMAGE" && (
                    <Zoom className="w-full max-h-[250px] overflow-hidden rounded-xl select-none">
                      <img
                        className="w-full h-full object-cover"
                        src={comment.content_url}
                        alt={comment.content}
                      />
                    </Zoom>
                  )}
                  {comment.type === "FILE" && (
                    <a
                      className="select-none flex flex-col gap-3 cursor-pointer"
                      // onClick={() => handleFileDownload(comment?.content_url)}
                      href={comment?.content_url}
                      target="_blank"
                    >
                      <span className="w-[25px]">
                        {renderFileIcon(comment?.content_url)}
                      </span>
                      <span className="text-xs">
                        {comment.file_name || "Fayl"}
                      </span>
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="h-[450px] flex items-center justify-center flex-col">
              <RiErrorWarningLine size={36} />
              <span>Hər hansı bir rəy yoxdur</span>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-white h-[250px] py-2 gap-2">
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
  task: PropTypes.any,
};

export default CommentsPanel;
