import { GoArrowDown } from "react-icons/go";
import { Link } from "react-router-dom";
import { HiMiniTrash } from "react-icons/hi2";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import useToast from "@/hooks/useToast";
import {
  useGetTemplatesQuery,
  useDeleteTemplateMutation,
} from "@/data/services/templateService";
import Spinner from "@/components/common/Spinner";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const TemplateTable = () => {
  const { data: templates = [], isLoading, isError } = useGetTemplatesQuery();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const {showToast} = useToast();
  const [
    deleteTemplate,
    {
      isSuccess: deleteSuccess,
      isError: deleteError,
    },
  ] = useDeleteTemplateMutation();

  const getTotalDays = (duration) => {
    return duration.reduce((total, data) => total + data.days, 0);
  };

  const openConfirmationModal = (id) => {
    setSelectedTemplate(id);
    setShowConfirmation(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmation(false);
    setSelectedTemplate(null);
  };

  const handleDeleteTemplate = () => {
    if (selectedTemplate) {
      deleteTemplate(selectedTemplate);
      closeConfirmationModal();
    }
  };

  useEffect(() => {
    if(deleteSuccess){
      showToast('Şablon uğurlu şəkildə silindi', 'success');
    }
  },[deleteSuccess])

  useEffect(() => {
    if(deleteError){
      showToast('Şablon silinə bilmədi', 'error');
    }
  },[deleteError])

  return (
    <div className="w-full overflow-x-auto">
      <Toaster />
      <ConfirmationModal
        showConfirmation={showConfirmation}
        closeConfirmationModal={closeConfirmationModal}
        handleDelete={handleDeleteTemplate}
      />
      <table className="w-full text-sm min-w-[1200px] border">
        <thead className="bg-gray-300/30 w-full rounded-lg text-left">
          <tr className="p-5 w-full flex items-center justify-between gap-5">
            <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[50%]">
              <span className="flex items-center gap-2">
                Şablon adı <GoArrowDown />
              </span>
            </th>
            <th className="text-sm font-medium w-[20%] text-gray-500">
              Total gün
            </th>
            <th className="text-sm font-medium w-[25%] text-gray-500">
              Qurumlar
            </th>
            <th className="text-sm font-medium w-[5%] text-gray-500 rounded-e-lg">
              Sil
            </th>
          </tr>
        </thead>
        <tbody className="w-full flex flex-col text-left">
          {isLoading && (
            <div className="w-full h-full flex items-center justify-center py-10">
              <Spinner />
            </div>
          )}
          {isError && <div>Hər hansı bir şablon mövcud deyil</div>}
          {templates.length > 0 ?templates.map((template) => (
            <tr
              key={template.id}
              className="p-5 border-b group-hover:bg-gray-200/20 border-grey/20 border-dashed w-full flex items-center justify-between gap-5 min-h-[76px]"
            >
              <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[50%]">
                <div className="flex items-center gap-4">
                  <Link
                    className="text-sm text-secondary hover:underline"
                  >
                    {template.name}
                  </Link>
                </div>
              </th>
              <td className="text-sm font-medium text-gray-500 w-[20%]">
                <div className="flex flex-col">
                  <h3 className="text-sm text-secondary">
                    {getTotalDays(template.duration)}
                  </h3>
                </div>
              </td>
              <td className="text-sm font-medium text-gray-500 w-[25%]">
                <div className="flex items-center gap-1">
                  {template.duration.map((data) => (
                    <div key={data.id}>
                      {data.companies.map((company) => (
                        <img
                          className="w-[30px] h-[30px] rounded-full border border-grey/20"
                          key={company.id}
                          src={company.image_url}
                          alt={company.name || "Company"}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </td>
              <td className="text-sm font-medium text-gray-500 w-[5%] flex items-center gap-2">
                <button
                  onClick={() => openConfirmationModal(template.id)}
                  className="outline-none border-none text-red-600 hover:bg-red-600/40 p-2 rounded-lg"
                  type="button"
                >
                  <HiMiniTrash size={20} />
                </button>
              </td>
            </tr>
          )) : (<div className="flex items-center justify-center h-full w-full p-10 font-semibold text-lg">Şablon mövcud deyil</div>)}
        </tbody>
      </table>
    </div>
  );
};

export default TemplateTable;
