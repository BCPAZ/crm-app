import { Outlet } from "react-router-dom";
import Sidebar from "@/components/App/Documents/Sidebar";
import { navigationLinks } from "@/utils/constants";

const SecurityLayout = () => {
  const securityLinks = navigationLinks.find((link) => link.title.toLowerCase() === 'security').elements;
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
        <div className="w-[20%] h-screen lg:block hidden">
          <Sidebar links={securityLinks} />
        </div>
        <main
          className={`h-full w-[75%] "}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SecurityLayout;
