import { navigationLinks } from "@/utils/constants";
import DropdownMenu from "./DropdownMenu";
import { openProjectSidebar } from "@/data/slices/siteSlice";
import { useDispatch } from "react-redux";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";

const Navigation = () => {
  const dispatch = useDispatch();

  return (
    <nav className="lg:flex hidden items-center justify-center bg-secondary h-[75px] w-full md:px-5 px-2 py-5">
      <div className="siteContainer">
        <div className="w-full flex items-center gap-2 justify-between">
          <button className="p-1 hover:bg-gray-300 transition-colors rounded-lg" onClick={() => dispatch(openProjectSidebar())}><TbLayoutSidebarRightCollapse size={28} color="white" /></button>
          {navigationLinks.map((nav, index) => (
            <DropdownMenu navElement={nav} key={index} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
