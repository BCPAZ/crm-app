import Sidebar from "@/components/App/Documents/Sidebar";
import { Outlet } from "react-router-dom";

const FieldManagementLayout = () => {
  return (
    <div className="h-screen">
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold w-full">Project Settings</h1>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between relative">
        <div className="w-[25%] absolute top-0 left-0">
          <Sidebar />
        </div>
        <main className="w-[75%] absolute top-0 right-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FieldManagementLayout;
