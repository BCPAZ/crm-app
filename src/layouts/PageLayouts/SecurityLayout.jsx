import { Outlet } from "react-router-dom";
import Sidebar from "@/components/App/Documents/Sidebar";
import { navigationLinks } from "@/utils/constants";
import { useLocation } from "react-router-dom";
const SecurityLayout = () => {
  const securityLinks = navigationLinks.find((link) => link.title.toLowerCase() === 'təhlükəsizlik').elements;
  const location = useLocation();

  const hideSidebar = location.pathname === '/create-new-user';
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-grow gap-5">
        {!hideSidebar && (
          <div className="w-[20%] h-screen lg:block hidden">
            <Sidebar links={securityLinks} />
          </div>
        )}
        <main className={`h-full ${hideSidebar ? 'w-full' : 'lg:w-[80%] w-full'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SecurityLayout;
