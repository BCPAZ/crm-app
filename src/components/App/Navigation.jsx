import { navigationLinks } from "@/utils/constants";
import DropdownMenu from "./DropdownMenu";
const Navigation = () => {
  return (
    <nav className="flex items-center justify-center bg-secondary h-[75px] w-full md:px-5 px-2 py-5">
      <div className="siteContainer">
        <div className="w-full flex items-center gap-2 justify-between">
          {navigationLinks.map((nav, index) => (
            <DropdownMenu navElement={nav} key={index} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
