import { IoIosAdd } from "react-icons/io";
import Low from "@/assets/icons/Kanban/low.svg";
import Medium from "@/assets/icons/Kanban/medium.svg";
import High from "@/assets/icons/Kanban/high.svg"
import SecondTextArea from "@/components/common/SecondTextArea";
import { IoCloudUploadSharp } from "react-icons/io5";

const OverviewPanel = () => {
  return (
    <section className="w-full h-full">
      <h1 className="text-lg font-medium">Prepare Monthly Financial Report</h1>
      <div className="mt-10 flex flex-col gap-5">
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-500 w-[100px]">Reporter</h3>
          <div className="flex-1">
            <img
              className="w-[25px] h-[25px] rounded-full "
              src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723680000&semt=ais_hybrid"
              alt="avatar"
            />
          </div>
        </div>
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-500 w-[100px]">Assignee</h3>
          <div className="flex-1 flex items-center gap-2">
            <img
              className="w-[25px] h-[25px] rounded-full "
              src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723680000&semt=ais_hybrid"
              alt="avatar"
            />
            <img
              className="w-[25px] h-[25px] rounded-full "
              src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723680000&semt=ais_hybrid"
              alt="avatar"
            />
            <img
              className="w-[25px] h-[25px] rounded-full "
              src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723680000&semt=ais_hybrid"
              alt="avatar"
            />
            <button className="p-1 bg-grey/20 rounded-full border border-gray-400 border-dashed"><IoIosAdd size={18}/></button>
          </div>
        </div>
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-500 w-[100px]">Due date</h3>
          <div className="flex-1">
            <h3 className="font-medium text-sm">22-23 June</h3>
          </div>
        </div>
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-500 w-[100px]">Priority</h3>
          <div className="flex-1 flex items-center gap-2">
            <button className="flex items-center gap-1 text-sm font-medium py-1 px-2 rounded-lg border"><img src={Low} alt="Priority" />Low</button>
            <button className="flex items-center gap-1 text-sm font-medium py-1 px-2 rounded-lg border"><img src={Medium} alt="Priority" />Medium</button>
            <button className="flex items-center gap-1 text-sm font-medium py-1 px-2 rounded-lg border"><img src={High} alt="Priority" />High</button>
          </div>
        </div>
        <div className="flex ">
          <h3 className="text-sm font-medium text-gray-500 w-[100px]">Description</h3>
          <SecondTextArea placeholder="Enter the description"/>
        </div>
        <div className="flex ">
          <h3 className="text-sm font-medium text-gray-500 w-[100px]">Attachments</h3>
          <div className="flex-1 flex items-center gap-2">
            <button className="flex items-center justify-center gap-1 text-sm font-medium w-16 h-16 rounded-lg border border-gray-400 border-dashed bg-grey/20 text-gray-500"><IoCloudUploadSharp size={20}/></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewPanel;
