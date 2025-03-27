import { navigationLinks } from "@/utils/constants";
import DropdownMenu from "./DropdownMenu";
import { openProjectSidebar } from "@/data/slices/siteSlice";
import { useDispatch } from "react-redux";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { useGetCompanyBySubdomainQuery } from "@/data/services/companyService";
import useSubdomain from "@/hooks/useSubdomain";

const moduleMapping = {
  "Sənədlər": "documents",
  "İş axını": "workflow",
  "Sahə idarəsi": "field_management",
  "E-poçt": "email",
  "Təhlükəsizlik": "security",
  "Xərclər": "cost",
  "Statistika": "insights",
  "Layihələr": "projects"
};

const Navigation = () => {
  const dispatch = useDispatch();
  const subdomain = useSubdomain();
  const { data: companyData } = useGetCompanyBySubdomainQuery(subdomain);

  const availableModules = companyData?.modules || [];

  const hasProjectModule = availableModules.includes("projects");

  const filteredNavLinks = navigationLinks.filter(navLink => {
    const moduleKey = moduleMapping[navLink.title];
    return !moduleKey || availableModules.includes(moduleKey);
  });

  return (
    <nav className="lg:flex hidden items-center justify-center bg-secondary h-[75px] w-full md:px-5 px-2 py-5">
      <div className="siteContainer">
        <div className="w-full flex items-center gap-2 justify-between">
          {hasProjectModule && (
            <button
              className="p-1 hover:bg-gray-300 transition-colors rounded-lg"
              onClick={() => dispatch(openProjectSidebar())}
            >
              <TbLayoutSidebarRightCollapse size={28} color="white" />
            </button>
          )}
          {filteredNavLinks.map((nav, index) => (
            <DropdownMenu navElement={nav} key={index} />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
