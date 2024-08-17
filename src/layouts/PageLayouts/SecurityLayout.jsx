import { Outlet } from "react-router-dom";
import Sidebar from "@/components/App/Documents/Sidebar";
import { navigationLinks } from "@/utils/constants";

const SecurityLayout = () => {
  const securityLinks = navigationLinks.find((link) => link.title.toLowerCase() === 'security').elements;
  return (
    <div className="h-full flex flex-col">
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
