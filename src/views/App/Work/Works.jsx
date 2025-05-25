import ConfirmationModal from "@/components/common/ConfirmationModal";
import Spinner from "@/components/common/Spinner";
import {
  useDeleteWorkMutation,
  useGetWorksQuery,
} from "@/data/services/workService";
import useToast from "@/hooks/useToast";
import moment from "moment";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { IoAddSharp } from "react-icons/io5";
import { TbTrash } from "react-icons/tb";
import { Link } from "react-router-dom";
// import { FaUsers } from "react-icons/fa";

const Works = () => {
  const { showToast } = useToast();
  const { data: projects = [], isLoading, isError } = useGetWorksQuery();
  const [projectSelected, setProjectSelected] = useState(null);
  const [deleteProject, { isSuccess: deleteSuccess, isError: deleteError }] =
    useDeleteWorkMutation();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const openConfirmation = (project) => {
    setProjectSelected(project);
    setShowConfirmation(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmation(false);
  };

  const handleDelete = () => {
    deleteProject(projectSelected.id);
  };

  useEffect(() => {
    if (deleteSuccess) {
      showToast("Tapşırıq uğurlu şəkildə silindi", "success");
      setShowConfirmation(false);
    }
  }, [deleteSuccess]);

  useEffect(() => {
    if (deleteError) {
      showToast("Tapşırıq silinə bilmədi", "error");
    }
  }, [deleteError]);

  return (
    <section>
      <Toaster />
      <ConfirmationModal
        title="Bu tapşırığı silmək istəyirsinizmi?"
        handleDelete={handleDelete}
        closeConfirmationModal={closeConfirmationModal}
        showConfirmation={showConfirmation}
      />
      <div className="siteContainer">
        <div className="flex items-center justify-between mt-10">
          <h1 className="text-2xl font-semibold ">Tapşırıqlar</h1>
          <Link
            to={"/works/create-work"}
            className="bg-black p-3 font-semibold text-white rounded-lg text-sm flex items-center gap-2"
          >
            <IoAddSharp size={18} />
            Tapşırıq yarat
          </Link>
        </div>
        {isLoading && (
          <div className="flex items-center w-full p-10 justify-center h-full">
            <Spinner />
          </div>
        )}
        {isError && (
          <div className="w-full h-full flex items-center justify-center text-2xl font-semibold">
            Heç bir Tapşırıq tapılmadı
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
                onClick={() => openConfirmation(project)}
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
                    <FaRegEye size={16} />
                    Baxın
                  </Link>
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

export default Works;
