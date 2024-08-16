import Sidebar from "@/components/App/Documents/Sidebar";
import { Outlet } from "react-router-dom";
import { navigationLinks } from "@/utils/constants";
import { useLocation } from "react-router-dom";

const FieldManagementLayout = () => {
  const fieldManagementLinks = navigationLinks.find((link) => link.title.toLowerCase() === 'field management').elements;
  const location = useLocation();

  const hideSidebar = location.pathname.match(/^\/issues\/[^/]+$/) !== null;
  
  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold w-full">Field Management</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-grow">
        {!hideSidebar && (
          <div className="w-[20%] h-screen lg:block hidden">
            <Sidebar links={fieldManagementLinks} />
          </div>
        )}
        <main className={`h-full ${hideSidebar ? 'w-full' : 'lg:w-[75%] w-full'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FieldManagementLayout;
