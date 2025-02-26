import Logo from "@/assets/images/logo.png";
import AnimatedSidebarLink from "./AnimatedSidebarLink";
import { useGrouppedProjectsQuery } from "@/data/services/projectService";
import { useGetCompanyBySubdomainQuery } from "@/data/services/companyService";
import { useDispatch, useSelector } from "react-redux";
import { setProject } from "@/data/slices/projectSlice";
import { closeProjectSidebar } from "@/data/slices/siteSlice";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProjectSidebar = () => {
  const { sidebar } = useSelector((state) => state.site)
  const { data: groups = [] } = useGrouppedProjectsQuery();
  const { data: companyData } = useGetCompanyBySubdomainQuery();

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
  return (
    <aside className={`flex-shrink-0  flex-col fixed top-0 z-20 ${sidebar ? 'translate-x-0' : '-translate-x-full'} transition-all duration-300 bg-white shadow-xl h-screen w-[275px]`}>
      <div className="p-5 overflow-y-auto">
        <div className="flex items-center justify-between gap-2">
          <img className="w-12 shrink-0" src={Logo} alt="Logo" />
          <button onClick={() => dispatch(closeProjectSidebar())} className="p-2 rounded-lg bg-gray-200"><MdClose size={20} color="gray" /></button>
        </div>
        <h2 className="py-4 border-b border-gray-200 text-lg font-semibold">Mövcud layihələr</h2>
        <button onClick={() => navigate('/create-new-user')} className="text-sm font-medium mt-3 underline">Müştəri yarat +</button>
        <div className="mt-5 flex flex-col gap-2">
          {
            groups.map((group, index) => (
              <AnimatedSidebarLink group={group} onClick={handleProjectClick} key={index} />
            ))
          }
        </div>
      </div>
    </aside>
  )
}

export default ProjectSidebar