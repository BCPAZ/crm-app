import Logo from "@/assets/images/logo.png";
import { useGetProjectsQuery } from "@/data/services/projectService";
import { useDispatch, useSelector } from "react-redux";
import { setProject } from "@/data/slices/projectSlice";
import { closeProjectSidebar } from "@/data/slices/siteSlice";
import { MdClose } from "react-icons/md";

const ProjectSidebar = () => {
  const { sidebar } = useSelector((state) => state.site)
  const { data: projects = [] } = useGetProjectsQuery();
  const dispatch = useDispatch();

  const handleProjectClick = (project) => {
    dispatch(setProject(project));
    window.location.href = `/projects/${project.id}`; // Səhifəni yeniləyərək yönləndirmək
  };
  return (
    <aside className={`flex-shrink-0  flex-col fixed top-0 z-20 ${sidebar ? 'translate-x-0' : '-translate-x-full'} transition-all duration-300 bg-white shadow-xl h-screen w-[275px]`}>
      <div className="p-5 overflow-y-auto">
        <div className="flex items-center justify-between gap-2">
          <img className="w-12 shrink-0" src={Logo} alt="Logo" />
          <button onClick={() => dispatch(closeProjectSidebar())} className="p-2 rounded-lg bg-gray-200"><MdClose size={20} color="gray" /></button>
        </div>
        <h2 className="py-4 border-b border-gray-200 text-lg font-semibold">Mövcud layihələr</h2>
        <div className="flex flex-col gap-2 mt-5">
          {
            projects?.map((project, index) => (
              <button type="button" onClick={() => handleProjectClick(project)} className="font-normal text-sm text-start hover:underline w-full" key={index}>
                {index}.{project.name}
              </button>
            ))
          }
        </div>
      </div>
    </aside>
  )
}

export default ProjectSidebar