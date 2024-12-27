import { Link } from "react-router-dom";
import { TbTrash } from "react-icons/tb";
import {  LuEye } from "react-icons/lu";
import { IoAddSharp } from "react-icons/io5";
import { useGetProjectsQuery } from "@/data/services/projectService";
import { IoMdCheckmark } from "react-icons/io";
import { IoCheckboxSharp } from "react-icons/io5";
import moment from "moment";
import Spinner from "@/components/common/Spinner";
import { setProject } from "@/data/slices/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { useState } from "react";
// import { FaUsers } from "react-icons/fa";

const Projects = () => {
  const { data: projects = [], isLoading, isError } = useGetProjectsQuery();
  const {project: selectedProject} = useSelector(state => state.project)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispatch = useDispatch();

  const handleSetProject = (project) => {
    dispatch(setProject(project));
  };

  const openConfirmation = () => {
    setShowConfirmation(true);
  }

  const closeConfirmationModal = () => {
    setShowConfirmation(false);
  }

  // const handleDelete = (project) => {
  //   deleteProject(project.id)
  // }

  return (
    <section>
      <ConfirmationModal title="Bu proyekti silmək istəyirsinizmi?" closeConfirmationModal={closeConfirmationModal} showConfirmation={showConfirmation} />
      <div className="siteContainer">
        <div className="flex items-center justify-between mt-10">
          <h1 className="text-2xl font-semibold ">Layihələr</h1>
          <Link
            to={"/create-project"}
            className="bg-black p-3 font-semibold text-white rounded-lg text-sm flex items-center gap-2"
          >
            <IoAddSharp size={18} />
            Layihə yarat
          </Link>
        </div>
        {isLoading && (
            <div className="flex items-center w-full p-10 justify-center h-full">
              <Spinner />
            </div>
          )}
          {isError && (
            <div className="w-full h-full flex items-center justify-center text-2xl font-semibold">
              Heç bir layihə tapılmadı
            </div>
          )}
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 py-10">
          {projects.map((project, index) => (
            <div
              className="relative p-6 rounded-lg border border-grey/20 flex flex-col gap-2"
              key={index}
            >
              <button
                type="button"
                className="absolute top-5 right-5 hover:bg-grey/20 p-2 rounded-md"
                onClick={openConfirmation}
              >
                <TbTrash size={20} />
              </button>
              <div className="flex flex-col gap-1 py-2 border-b border-grey/20">
                <h1 className="text-xl font-semibold">{project.name}</h1>
                <span className="text-xs font-base text-gray-400">
                  Yaradılma tarixi : {moment(project.created_at).fromNow()}
                </span>
                <p className="line-clamp-2 text-sm mt-3">{project.code}</p>
              </div>
              <div className="flex items-center justify-between gap-2 mt-3">
                <div className="flex items-center gap-2">
                  <Link
                    className="text-white bg-secondary font-medium rounded-lg py-2 px-4 text-xs w-fit flex items-center gap-2"
                    to={`${project.id}`}
                  >
                    <LuEye size={16} />
                    Baxın
                  </Link>
                  <button
                    onClick={() => handleSetProject(project)}
                    className={`text-white font-medium rounded-lg py-2 px-4 text-sm w-fit flex items-center gap-2 ${
                      selectedProject?.id === project.id
                        ? "bg-grey"
                        : "bg-green-600"
                    }`}
                  >
                    {
                      selectedProject?.id === project.id ? <IoCheckboxSharp size={16} /> : <IoMdCheckmark size={16} />
                    }
                  </button>
                </div>
                {/* <span className="flex items-center gap-2 text-xs font-semibold">
                  <FaUsers color="#00A76F" size={16} />
                  {project.members.length}
                </span> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
