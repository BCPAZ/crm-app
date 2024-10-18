import { IoIosAdd } from "react-icons/io";
import Low from "@/assets/icons/Kanban/low.svg";
import Medium from "@/assets/icons/Kanban/medium.svg";
import High from "@/assets/icons/Kanban/high.svg";
import SecondTextArea from "@/components/common/SecondTextArea";
import { IoCloudUploadSharp } from "react-icons/io5";
import UserSelectModal from "../Cost/UserSelectModal";
import { useEffect, useState } from "react";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import PropTypes from "prop-types";
import {
  useSetAttachmentMutation,
  useSetDescriptionMutation,
  useSetDueDateMutation,
  useSetPriorityMutation,
  useSetReporterMutation,
} from "@/data/services/taskManagementService";
import moment from "moment";

const OverviewPanel = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignees, setAssignees] = useState(task.assignees || []);

  const [description, setDescription] = useState(task.description || "");

  const [dueDate, setDueDate] = useState(task.due_date || null);

  const [setPriority] = useSetPriorityMutation();
  const [changeDescription] = useSetDescriptionMutation();
  const [changeDueDate] = useSetDueDateMutation();
  const [changeReporter] = useSetReporterMutation();
  const [changeAttachment] = useSetAttachmentMutation();

  const handleUserSelect = (user) => {
    setAssignees([...assignees, user]);
  };

  useEffect(() => {
    setDescription(task.description || "");
  }, [task.id, task.description]);

  useEffect(() => {
    setDueDate(task.due_date || null);
  }, [task.id, task.due_date]);

  const handleChangeReporter = (reporterId) => {
    changeReporter({
      taskId: task.id,
      reporter_id: reporterId,
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

  return (
    <section className="w-full h-full">
      <UserSelectModal
        modal={isModalOpen}
        closeUserModal={() => setIsModalOpen(false)}
        options={[]}
        isLoading={false}
        isError={false}
        onChange={handleUserSelect}
      />
      <h1 className="text-lg font-medium">{task?.name}</h1>
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
            {assignees.map((user, index) => (
              <img
                key={index}
                className="w-[25px] h-[25px] rounded-full "
                src={user.image_url}
                alt="avatar"
              />
            ))}
            <button
              className="p-1 bg-grey/20 rounded-full border border-gray-400 border-dashed"
              onClick={() => setIsModalOpen(true)} // Modalı aç
            >
              <IoIosAdd size={18} />
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-500 w-[100px]">
            Son tarix
          </h3>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div>
                <CustomDatePicker
                  value={dueDate ? moment(dueDate).format("YYYY/MM/DD") : null}
                  onChange={(v) =>
                    changeDueDate({ taskId: task.id, dueDate: v })
                  }
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
              className="flex items-center gap-1 text-sm font-medium py-1 px-2 rounded-lg border"
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
              className="flex items-center gap-1 text-sm font-medium py-1 px-2 rounded-lg border"
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
              className="flex items-center gap-1 text-sm font-medium py-1 px-2 rounded-lg border"
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
          <div className="flex-1 flex items-center gap-2">
            <button
              onClick={handleFileUpload}
              className="flex items-center justify-center gap-1 text-sm font-medium w-16 h-16 rounded-lg border border-gray-400 border-dashed bg-grey/20 text-gray-500"
            >
              <IoCloudUploadSharp size={20} />
            </button>
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
