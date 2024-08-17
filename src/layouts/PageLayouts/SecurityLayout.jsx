import { Outlet } from "react-router-dom";
import Sidebar from "@/components/App/Documents/Sidebar";
import { navigationLinks } from "@/utils/constants";
import { useLocation } from "react-router-dom";
const SecurityLayout = () => {
  const securityLinks = navigationLinks.find((link) => link.title.toLowerCase() === 'security').elements;
  const location = useLocation();

  const hideSidebar = location.pathname === '/create-new-user';
  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-3">
        {!hideSidebar && <div className="w-[250px] h-screen lg:block hidden">
          <Sidebar links={securityLinks} />
        </div>}
        <main
          className={`h-full lg:max-w-[75%] w-full px-5`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SecurityLayout;
