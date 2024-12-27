import { useState, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { FileIcon, defaultStyles } from "react-file-icon";
import Spinner from "@/components/common/Spinner";
import ReactPaginate from "react-paginate";
import { Toaster } from "react-hot-toast";
import SecondInput from "@/components/common/SecondInput";
import Select from "@/components/common/Select";
import CustomDatePicker from "@/components/common/CustomDatePicker";
import useToast from "@/hooks/useToast";
import {
  useGetDocumentsQuery,
  useSubmitDocumentMutation,
} from "@/data/services/documentService";
import moment from "moment";
import { Link } from "react-router-dom";

const options = [
  { id: "register", name: "Reyestr" },
  { id: "drawings", name: "Çertyoj" },
  { id: "temporary", name: "Müvəqqəti" },
];

const DocumentRegister = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    name: "",
    documentNo: "",
    startDate: null,
    endDate: null,
    type: null,
  });

  const { name, documentNo, startDate, endDate, type } = filters;

  const { data, isLoading, isError } = useGetDocumentsQuery({
    page,
    name,
    document_no: documentNo,
    start_date: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
    end_date: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
    type,
  });

  const [submitDocument, { isSuccess: submitSuccess, isError: submitError }] =
    useSubmitDocumentMutation();
  const documents = data?.documents || [];
  const meta = data?.meta || {};
  const { showToast } = useToast();

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

  const handleChange = (field, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

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

  const resetFilters = () => {
    setFilters({
      name: "",
      documentNo: "",
      startDate: null,
      endDate: null,
      type: null,
    });
  };


  return (
    <section className="h-full">
      <div className="flex justify-between relative h-full">
        <div className="w-full h-full absolute top-0 right-0 flex flex-col justify-between px-5 gap-10 pt-10 pb-[100px]">
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            <SecondInput
              onChange={(e) => handleChange("name", e.target.value)}
              column
              value={name}
              label="Şablon adı"
              placeholder="Şablon adı daxil edin"
              type="text"
            />
            <SecondInput
              value={documentNo}
              onChange={(e) => handleChange("documentNo", e.target.value)}
              column
              label="Sənəd nömrəsi"
              placeholder="Sənəd nömrəsi daxil edin"
              type="text"
            />
            <CustomDatePicker
              value={startDate}
              onChange={(value) => handleChange("startDate", value)}
              label="Başlanğıc tarixi seçin"
            />
            <CustomDatePicker
              value={endDate}
              onChange={(value) => handleChange("endDate", value)}
              label="Bitiş tarixi seçin"
            />
            <Select
              onChange={(e) => handleChange("type", e)}
              label="Tip"
              options={options}
              column
            />
          </div>
          <div className="py-10">
            <div className="w-full rounded-lg shadow-xl bg-white">
              <Toaster />
              <div className="text-sm font-medium text-gray-500 w-full">
                <div className="flex items-center justify-between w-full p-5">
                  <h3>{documents.length} nəticə tapıldı</h3>
                  <button onClick={resetFilters}>Filtrləri təmizlə</button>
                </div>
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-sm min-w-[1200px]">
                    <thead className="bg-gray-300/30 w-full rounded-lg text-left">
                      <tr className="p-5 w-full flex items-center justify-between gap-5">
                        <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[50%]">
                          <span className="flex items-center gap-2">Sənəd</span>
                        </th>
                        <th className="text-sm font-medium w-[14%] text-gray-500">
                          Sənəd nömrəsi
                        </th>
                        <th className="text-sm font-medium w-[14%] text-gray-500">
                          Səhifə sayı
                        </th>
                        <th className="text-sm font-medium w-[14%] text-gray-500">
                          Müəllif
                        </th>
                        <th className="text-sm font-medium w-[8%] text-gray-500 rounded-e-lg">
                          Əməliyyat
                        </th>
                      </tr>
                    </thead>
                    <tbody className="w-full flex flex-col text-left">
                      <div className="py-4 flex items-center justify-center w-full">
                        {isLoading && <Spinner />}
                      </div>
                      {isError || documents.length === 0 ? (
                        <div className="p-5 text-center w-full">
                          Heç bir sənəd tapılmadı
                        </div>
                      ) : (
                        documents.map((document, index) => (
                          <tr
                            key={index}
                            className="p-5 border-b group-hover:bg-gray-200/20 border-grey/20 border-dashed w-full flex items-center justify-between gap-5 min-h-[76px]"
                          >
                            <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[50%]">
                              <div className="flex items-center gap-4">
                                <div className="w-[25px] h-[25px]">
                                  {renderFileIcon(document.file)}
                                </div>
                                <Link to={`/document/${document.id}`} className="text-sm text-secondary hover:underline">
                                  {document.name}
                                </Link>
                              </div>
                            </th>
                            <td className="text-sm font-medium text-gray-500 w-[14%]">
                              <div className="flex flex-col">
                                <h3 className="text-xs text-secondary">
                                  {document.document_no}
                                </h3>
                              </div>
                            </td>
                            <td className="text-sm font-medium text-gray-500 w-[14%]">
                              <div className="flex flex-col">
                                <h3 className="text-xs text-secondary">
                                  {document.page_size}
                                </h3>
                              </div>
                            </td>
                            <td className="text-sm font-medium text-gray-500 w-[14%]">
                              <span className="text-xs text-secondary">
                                {document.author}
                              </span>
                            </td>
                            <td className="text-sm font-medium text-gray-500 w-[8%] flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleSubmitDocuments(document.id)
                                }
                                className="outline-none border-none p-1 hover:bg-blue-600/40 hover:text-blue-600 rounded-lg"
                                type="button"
                              >
                                <IoMdCheckmark size={20} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-5 flex justify-end px-5">
                <ReactPaginate
                  previousLabel={"‹"}
                  nextLabel={"›"}
                  breakLabel={"..."}
                  pageCount={meta?.last_page}
                  onPageChange={(selectedItem) => handlePageChange(selectedItem.selected + 1)}
                  containerClassName="flex items-center justify-center space-x-2 py-4"
                  pageClassName="rounded border border-gray-300 px-3 py-1 hover:bg-blue-100 transition duration-300"
                  pageLinkClassName="text-secondary hover:text-blue-900"
                  previousClassName="rounded border border-gray-300 px-3 py-1 hover:bg-blue-100 transition duration-300"
                  nextClassName="rounded border border-gray-300 px-3 py-1 hover:bg-blue-100 transition duration-300"
                  activeClassName="bg-blue-200"
                  breakClassName="px-3 py-1 text-gray-500"
                />
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentRegister;
