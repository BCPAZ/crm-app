import High from "@/assets/icons/Kanban/high.svg";
import Low from "@/assets/icons/Kanban/low.svg";
import Medium from "@/assets/icons/Kanban/medium.svg";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import SecondTextArea from "@/components/common/SecondTextArea";
import Spinner from "@/components/common/Spinner";
import {
  useSetAttachmentMutation,
  useSetDescriptionMutation,
  useSetDueDateMutation,
  useSetPriorityMutation,
  useSetReporterMutation,
  useUpdateNameMutation,
} from "@/data/services/taskManagementService";
import { useGetUserQuery } from "@/data/services/usersService";
import useToast from "@/hooks/useToast";
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import { Toaster } from "react-hot-toast";
import { IoIosAdd } from "react-icons/io";
import { IoCloudUploadSharp } from "react-icons/io5";
import UserSelectModal from "../Cost/UserSelectModal";

const OverviewPanel = ({ task }) => {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState(task?.description || "");
  const [taskName, setTaskName] = useState(task?.name || "");
  const [updateTask, setUpdateTask] = useState(false);

  const [dueDate, setDueDate] = useState(task?.due_date || null);
  const { data } = useGetUserQuery();

  const users = data?.users || [];

  const [setPriority] = useSetPriorityMutation();
  const [changeDescription] = useSetDescriptionMutation();
  const [changeDueDate] = useSetDueDateMutation();
  const [
    changeReporter,
    { isSuccess: changeReporterSuccess, isError: changeReporterError },
  ] = useSetReporterMutation();
  const [changeAttachment] = useSetAttachmentMutation();
  const [changeName, { isLoading, isError, isSuccess }] =
    useUpdateNameMutation();

  useEffect(() => {
    setDescription(task.description || "");
  }, [task.id, task.description]);

  useEffect(() => {
    setDueDate(task?.due_date || null);
  }, [task.id, task.due_date]);

  const handleChangeReporter = (reporterId) => {
    changeReporter({
      taskId: task.id,
      reporter_id: reporterId.id,
    });
  };

  const handleFileUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("attachment", file);
      changeAttachment({
        taskId: task.id,
        body: formData,
      });

      fileInput.remove();
    });

    fileInput?.click();
  };

  const getFileExtension = (filename) => {
    return filename.split(".").pop();
  };

  const renderFileIcon = (filename) => {
    if (!filename) return null;

    const ext = getFileExtension(filename);
    const style = defaultStyles[ext] || defaultStyles["default"];
    return <FileIcon extension={ext} {...style} />;
  };

  const handleUpdateTask = () => {
    setUpdateTask(true);
  };

  const handleChangeTaskName = () => {
    changeName({
      taskId: task.id,
      name: taskName,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setUpdateTask(false);
      showToast("Ad uğurlu şəkildə dəyişdirildi.", "success");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast("Ad dəyişdirilən zaman xəta baş verdi.", "error");
    }
  }, [isError]);

  useEffect(() => {
    if (changeReporterSuccess) {
      showToast(`Seçilən şəxs təyin edildi.`, "success");
    }
  }, [changeReporterSuccess]);

  useEffect(() => {
    if (changeReporterError) {
      showToast(`Seçilən şəxs təyin edilə bilmədi`, "error");
    }
  }, [changeReporterError]);

  return (
    <section className="w-full h-full">
      <Toaster />
      <UserSelectModal
        modal={isModalOpen}
        closeUserModal={() => setIsModalOpen(false)}
        options={users || []}
        isLoading={false}
        isError={false}
        onChange={handleChangeReporter}
        returnIdOnly={true}
      />
      {updateTask ? (
        <div className="flex items-center justify-between gap-2">
          <input
            onChange={(e) => setTaskName(e.target.value)}
            value={taskName}
            placeholder="Tapşırıq adını daxil edin"
            autoComplete="off"
            className="h-full p-3 rounded-lg bg-gray-200/20 text-sm w-[80%] border border-gray-400/20"
          />
          <button
            onClick={handleChangeTaskName}
            className="text-sm bg-black text-white p-3 rounded-lg flex items-center justify-center"
          >
            {isLoading ? <Spinner /> : "Təyin et"}
          </button>
        </div>
      ) : (
        <h1 onClick={handleUpdateTask} className="text-lg font-medium">
          {task?.name}
        </h1>
      )}
      <div className="mt-10 flex flex-col gap-5">
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-500 w-[100px]">
            Təyin edən
          </h3>
          <div className="flex-1">
            <img
              className="w-[25px] h-[25px] rounded-full "
              src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723680000&semt=ais_hybrid"
              alt="avatar"
            />
          </div>
        </div>
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-500 w-[100px]">
            Yerinə yetirən
          </h3>
          <div className="flex-1 flex items-center gap-2">
            <div className="relative group w-auto">
              <img
                className="w-[25px] h-[25px] rounded-full border border-gray-400/20"
                src={
                  task?.reporter?.avatar_url ||
                  "https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg"
                }
                alt="avatar"
              />
              <span className="text-[10px] flex-1 hidden group-hover:block bg-black/50 text-white p-2 rounded-lg absolute top-8">
                {task?.reporter?.name || "N/A"}
              </span>
            </div>
            <button
              className="p-1 bg-grey/20 rounded-full border border-gray-400 border-dashed"
              onClick={() => setIsModalOpen(true)}
            >
              <IoIosAdd size={18} />
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-500 w-[100px]">
            Başlama tarixi
          </h3>
          <span className="text-sm font-medium">
            {moment(task?.created_at).format("DD/MM/YYYY - HH:ss")}
          </span>
        </div>
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-500 w-[100px]">
            Son tarix
          </h3>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div>
                <CustomDatePicker
                  value={dueDate}
                  onChange={(v) => {
                    if (v !== dueDate) {
                      setDueDate(v);
                      changeDueDate({ taskId: task.id, dueDate: v });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-500 w-[100px]">
            Öncəlik
          </h3>
          <div className="flex-1 flex items-center gap-2">
            <button
              className={`flex items-center gap-1 text-sm font-medium py-1 px-2 rounded-lg border ${
                task.priority === "LOW" ? "border border-black" : "border"
              }`}
              onClick={() =>
                setPriority({
                  taskId: task.id,
                  priority: "LOW",
                })
              }
            >
              <img src={Low} alt="Priority" />
              Aşağı
            </button>
            <button
              className={`flex items-center gap-1 text-sm font-medium py-1 px-2 rounded-lg border ${
                task.priority === "MEDIUM" ? "border border-black" : "border"
              }`}
              onClick={() =>
                setPriority({
                  taskId: task.id,
                  priority: "MEDIUM",
                })
              }
            >
              <img src={Medium} alt="Priority" />
              Orta
            </button>
            {/* {task?.priority === "HIGH" && ( */}
            <button
              className={`flex items-center gap-1 text-sm font-medium py-1 px-2 rounded-lg ${
                task.priority === "HIGH" ? "border border-black" : "border"
              }`}
              onClick={() =>
                setPriority({
                  taskId: task.id,
                  priority: "HIGH",
                })
              }
            >
              <img src={High} alt="Priority" />
              Yüksək
            </button>
            {/* )} */}
          </div>
        </div>
        <div className="flex ">
          <h3 className="text-sm font-medium text-gray-500 w-[100px]">
            Açıqlama
          </h3>
          <SecondTextArea
            placeholder="Rəy daxil edin"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() =>
              changeDescription({
                taskId: task.id,
                description: description,
              })
            }
          />
        </div>
        <div className="flex ">
          <h3 className="text-sm font-medium text-gray-500 w-[100px]">
            Fayllar
          </h3>
          <div className="flex-1 flex-col items-center gap-5">
            <button
              onClick={handleFileUpload}
              className="flex items-center justify-center gap-1 text-sm font-medium w-16 h-16 rounded-lg border border-gray-400 border-dashed bg-grey/20 text-gray-500"
            >
              <IoCloudUploadSharp size={20} />
            </button>
            <div className="flex gap-5 items-center mt-5">
              {task?.attachments?.map((attachment) => (
                <div key={attachment.id} className="w-10 group">
                  <a target="_blank" href={attachment.url}>
                    {renderFileIcon(attachment.url)}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

OverviewPanel.propTypes = {
  task: PropTypes.any,
};

export default OverviewPanel;
