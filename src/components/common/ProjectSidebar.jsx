import { useGetCompanyBySubdomainQuery } from "@/data/services/companyService";
import { useGrouppedProjectsQuery } from "@/data/services/projectService";
import { setProject } from "@/data/slices/projectSlice";
import { closeProjectSidebar } from "@/data/slices/siteSlice";
import useSubdomain from "@/hooks/useSubdomain";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AnimatedSidebarLink from "./AnimatedSidebarLink";

const ProjectSidebar = () => {
  const subdomain = useSubdomain();
  const { sidebar } = useSelector((state) => state.site);
  const { data: groups = [] } = useGrouppedProjectsQuery();
  const { data: companyData } = useGetCompanyBySubdomainQuery(subdomain);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const availableModules = companyData?.modules || [];
  const hasProjectModule = availableModules.includes("projects");

  if (!hasProjectModule) {
    return null;
  }

  const handleProjectClick = (project) => {
    dispatch(setProject(project));
    window.location.href = `/projects/${project.id}`;
  };

  return null;

  return (
    <aside
      className={`flex-shrink-0  flex-col fixed top-0 z-20 ${
        sidebar ? "translate-x-0" : "-translate-x-full"
      } transition-all duration-300 bg-white shadow-xl h-screen w-[275px]`}
    >
      <div className="p-5 overflow-y-auto">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {companyData?.image_url && (
              <div className="w-10 h-10 rounded-lg shrink-0 overflow-hidden">
                <img
                  className="w-full h-full object-cover shrink-0"
                  src={companyData?.image_url}
                  alt={companyData?.name}
                />
              </div>
            )}
            <span className="text-md font-medium">{companyData?.name}</span>
          </div>
          <button
            onClick={() => dispatch(closeProjectSidebar())}
            className="p-2 rounded-lg h-fit bg-gray-200"
          >
            <MdClose size={20} color="gray" />
          </button>
        </div>
        <h2 className="py-4 border-b border-gray-200 text-lg font-semibold">
          Mövcud tapşırıqlar
        </h2>
        <button
          onClick={() => navigate("/create-new-user")}
          className="text-sm font-medium mt-3 underline"
        >
          Müştəri yarat +
        </button>
        <div className="mt-5 flex flex-col gap-2">
          {groups.map((group, index) => (
            <AnimatedSidebarLink
              group={group}
              onClick={handleProjectClick}
              key={index}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ProjectSidebar;
