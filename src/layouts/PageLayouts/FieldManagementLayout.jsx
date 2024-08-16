import Sidebar from "@/components/App/Documents/Sidebar";
import { Outlet } from "react-router-dom";
import { navigationLinks } from "@/utils/constants";

const FieldManagementLayout = () => {
  const fieldManagementLinks = navigationLinks.find((link) => link.title.toLowerCase() === 'field management').elements;

  return (
    <div className="h-screen flex flex-col">
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold w-full">Project Settings</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-grow">
        <div className="w-[25%] h-full">
          <Sidebar links={fieldManagementLinks} />
        </div>
        <main className="w-[75%] h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FieldManagementLayout;
