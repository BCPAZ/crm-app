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
