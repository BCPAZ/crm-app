import { Outlet } from "react-router-dom";
import Sidebar from "@/components/App/Documents/Sidebar";
import { navigationLinks } from "@/utils/constants";

const SecurityLayout = () => {
  const securityLinks = navigationLinks.find((link) => link.title.toLowerCase() === 'security').elements;
  return (
    <div className="h-full flex flex-col">
      <div className="flex gap-3">
        <div className="w-[250px] h-screen lg:block hidden">
          <Sidebar links={securityLinks} />
        </div>
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
