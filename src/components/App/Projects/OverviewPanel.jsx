import { IoIosAdd } from "react-icons/io";
import Low from "@/assets/icons/Kanban/low.svg";
import Medium from "@/assets/icons/Kanban/medium.svg";
import High from "@/assets/icons/Kanban/high.svg";
import SecondTextArea from "@/components/common/SecondTextArea";
import { IoCloudUploadSharp } from "react-icons/io5";
import UserSelectModal from "../Cost/UserSelectModal";
import { useState } from "react";
import CustomDatePicker from "@/components/common/CustomDatePicker";

const OverviewPanel = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignees, setAssignees] = useState(task.assignees || []);

  const handleUserSelect = (user) => {
    setAssignees([...assignees, user]);
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
                <span className="text-xs font-medium">Başlanğıc tarixi</span>
                <CustomDatePicker />
              </div>
              <div>
                <span className="text-xs font-medium">Bitiş tarixi</span>
                <CustomDatePicker />
              </div>
            </div>
            <h3 className="font-medium text-sm mt-3">22-23 June</h3>
          </div>
        </div>
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-500 w-[100px]">
            Öncəlik
          </h3>
          <div className="flex-1 flex items-center gap-2">
            {task?.priority === "LOW" && (
              <button className="flex items-center gap-1 text-sm font-medium py-1 px-2 rounded-lg border">
                <img src={Low} alt="Priority" />
                Aşağı
              </button>
            )}
            {task?.priority === "MEDIUM" && (
              <button className="flex items-center gap-1 text-sm font-medium py-1 px-2 rounded-lg border">
                <img src={Medium} alt="Priority" />
                Orta
              </button>
            )}
            {task?.priority === "HIGH" && (
              <button className="flex items-center gap-1 text-sm font-medium py-1 px-2 rounded-lg border">
                <img src={High} alt="Priority" />
                Yüksək
              </button>
            )}
          </div>
        </div>
        <div className="flex ">
          <h3 className="text-sm font-medium text-gray-500 w-[100px]">
            Açıqlama
          </h3>
          <SecondTextArea placeholder="Rəy daxil edin" />
        </div>
        <div className="flex ">
          <h3 className="text-sm font-medium text-gray-500 w-[100px]">
            Fayllar
          </h3>
          <div className="flex-1 flex items-center gap-2">
            <button className="flex items-center justify-center gap-1 text-sm font-medium w-16 h-16 rounded-lg border border-gray-400 border-dashed bg-grey/20 text-gray-500">
              <IoCloudUploadSharp size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewPanel;
