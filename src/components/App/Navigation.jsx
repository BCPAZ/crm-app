import { navigationLinks } from "@/utils/constants";
import DropdownMenu from "./DropdownMenu";
const Navigation = () => {
  return (
    <nav className="flex items-center justify-center bg-secondary h-[75px] w-full p-5">
      <div className="max-w-[1030px] w-full flex items-center gap-2 justify-between">
        {navigationLinks.map((nav, index) => (
            <DropdownMenu navElement={nav} key={index} />
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
