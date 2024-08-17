import { Outlet } from "react-router-dom";
import Sidebar from "@/components/App/Documents/Sidebar";
import { navigationLinks } from "@/utils/constants";

const SecurityLayout = () => {
  const securityLinks = navigationLinks.find((link) => link.title.toLowerCase() === 'security').elements;
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-grow">
        <div className="md:w-[18%] h-screen lg:block hidden">
          <Sidebar links={securityLinks} />
        </div>
        <main
          className={`h-full md:w-[75%] w-full"}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SecurityLayout;
