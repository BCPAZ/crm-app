import Searchbar from "@/components/common/Searchbar";
import { GoArrowDown } from "react-icons/go";
import useToast from "@/hooks/useToast";
import { useEffect, useState } from "react";
import { useGetDocumentsQuery, useSubmitDocumentMutation } from "@/data/services/documentService";
import Spinner from "@/components/common/Spinner";
import Pagination from "@/components/common/Pagination";
import { Toaster } from "react-hot-toast";
import { FileIcon, defaultStyles } from "react-file-icon";
import { IoMdCheckmark } from "react-icons/io";

const DocumentsTable = ({ filters }) => {
  const [page, setPage] = useState(1);

  const isFiltersEmpty = Object.values(filters).every(value => value === null || value === "");
  const { data, isLoading, isError } = useGetDocumentsQuery(
    isFiltersEmpty ? { page } : { ...filters, page }
  );

  useEffect(() => {
    console.log("Gələn data:", data);
  }, [data]);

  const [submitDocument, { isSuccess: submitSuccess, isError: submitError }] = useSubmitDocumentMutation();
  const documents = data?.documents || [];
  const meta = data?.meta || {};
  const { showToast } = useToast();

  const getFileExtension = (filename) => {
    return filename.split(".").pop();
  };

  const renderFileIcon = (filename) => {
    const ext = getFileExtension(filename);
    const style = defaultStyles[ext] || defaultStyles["default"];

    return <FileIcon extension={ext} {...style} />;
  };

  const handleSubmitDocuments = (id) => {
    submitDocument(id);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (submitSuccess) {
      showToast("Sənəd yoxlanışa göndərildi", "success");
    }
  }, [submitSuccess]);

  useEffect(() => {
    if (submitError) {
      showToast("Sənəd yoxlanışa göndərilə bilmədi", "error");
    }
  }, [submitError]);

  return (
    <div className="w-full rounded-lg shadow-xl bg-white">
      <Toaster />
      <div className="text-sm font-medium text-gray-500 w-full">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 p-5">
          <div className="w-full">
            <Searchbar simple />
          </div>
        </div>
        <div className="flex flex-col w-full p-5">
          <h3>{documents.length} nəticə tapıldı</h3>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm min-w-[1200px]">
            <thead className="bg-gray-300/30 w-full rounded-lg text-left">
              <tr className="p-5 w-full flex items-center justify-between gap-5">
                <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[50%]">
                  <span className="flex items-center gap-2">
                    Sənəd <GoArrowDown />
                  </span>
                </th>
                <th className="text-sm font-medium w-[14%] text-gray-500">Sənəd nömrəsi</th>
                <th className="text-sm font-medium w-[14%] text-gray-500">Səhifə sayı</th>
                <th className="text-sm font-medium w-[14%] text-gray-500">Müəllif</th>
                <th className="text-sm font-medium w-[8%] text-gray-500 rounded-e-lg">Təsdiqlə</th>
              </tr>
            </thead>
            <tbody className="w-full flex flex-col text-left">
              <div className="py-4 flex items-center justify-center w-full">
                {isLoading && <Spinner />}
              </div>
              {isError || documents.length === 0 ? (
                <div className="p-5 text-center w-full">Heç bir sənəd tapılmadı</div>
              ) : (
                documents.map((document, index) => (
                  <div className="group" key={index}>
                    <tr className="p-5 border-b group-hover:bg-gray-200/20 border-grey/20 border-dashed w-full flex items-center justify-between gap-5 min-h-[76px]">
                      <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[50%]">
                        <div className="flex items-center gap-4">
                          <div className="w-[25px] h-[25px]">{renderFileIcon(document.file)}</div>
                          <div className="text-sm text-secondary hover:underline">{document.name}</div>
                        </div>
                      </th>
                      <td className="text-sm font-medium text-gray-500 w-[14%]">
                        <div className="flex flex-col">
                          <h3 className="text-xs text-secondary">{document.document_no}</h3>
                        </div>
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[14%]">
                        <div className="flex flex-col">
                          <h3 className="text-xs text-secondary">{document.page_size}</h3>
                        </div>
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[14%]">
                        <span className="text-xs text-secondary">{document.author}</span>
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[8%] flex items-center gap-2">
                        <button
                          onClick={() => handleSubmitDocuments(document.id)}
                          className="outline-none border-none p-1 hover:bg-blue-600/40 hover:text-blue-600 rounded-lg"
                          type="button"
                        >
                          <IoMdCheckmark size={20} />
                        </button>
                      </td>
                    </tr>
                  </div>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination meta={meta} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default DocumentsTable;
