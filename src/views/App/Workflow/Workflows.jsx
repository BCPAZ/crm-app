import CustomDatePicker from "@/components/common/CustomDatePicker";
import Spinner from "@/components/common/Spinner";
import { GoArrowDown } from "react-icons/go";
import SecondInput from "@/components/common/SecondInput";
import Select from "@/components/common/Select";
import moment from "moment";
import { useState } from "react";
import { useGetWorkflowsQuery } from "@/data/services/workflowsService";
import Pagination from "@/components/common/Pagination";
import { IoMdRefresh } from "react-icons/io";
import { Link } from "react-router-dom";

const Workflows = () => {
  const renderStatus = (status) => {
    switch (status) {
      case "REJECTED":
        return (
          <span className="text-xs py-1 px-2  rounded bg-red-600/20 text-red-600 capitalize w-full">
            Rədd edilib
          </span>
        );
      case "APPROVED":
        return (
          <span className="text-xs py-1 px-2  rounded bg-green-600/20 text-green-600 capitalize w-full">
            Təsdiqlənib
          </span>
        );
      case "PENDING":
        return (
          <span className="text-xs py-1 px-2 rounded bg-yellow-600/20 text-yellow-600 capitalize w-full">
            Gözlənilir
          </span>
        );
      default:
        return (
          <span className="text-xs py-1 px-2  rounded bg-gray-600/40 capitalize w-full">
            Naməlum
          </span>
        );
    }
  };

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    name: "",
    documentNo: "",
    startDate: null,
    endDate: null,
    status: null,
  });

  const options = [
    {
      id: "PENDING",
      name: "Gözlənilir",
    },
    {
      id: "REJECTED",
      name: "Rədd edilib",
    },
    {
      id: "APPROVED",
      name: "Təsdiqlənib",
    },
  ];

  const { name, documentNo, startDate, endDate, status } = filters;

  const { data, isLoading, isError } = useGetWorkflowsQuery({
    page,
    name,
    document_no: documentNo,
    start_date: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
    end_date: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
    status: status,
  });

  const workflows = data?.workflows || [];
  const meta = data?.meta || {};

  const handleChange = (field, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
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
    <section>
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold w-full">
              Axtarış prosesi - İş axını
            </h1>
          </div>
        </div>
      </div>
      <div className="siteContainer h-full mt-10">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-5 py-10">
          <SecondInput
            onChange={(e) => handleChange("name", e.target.value)}
            column
            value={name}
            label="Proyekt adı"
            type="text"
            placeholder="Proyekt adı daxil edin"
          />
          <SecondInput
            name="document_no"
            onChange={(e) => handleChange('documentNo',e.target.value)}
            placeholder="Sənəd nömrəsi daxil edin"
            value={documentNo}
            column
            type="text"
            label="Sənəd No"
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
            name="type"
            onChange={(e) => handleChange("status", e)}
            value={status}
            label="Status"
            options={options}
            column
          />
        </div>
        <div className="py-10">
          <button
            onClick={resetFilters}
            className="mb-5 text-black border-2 border-grey/20 p-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <IoMdRefresh size={20} />
            Filtrləri təmizlə
          </button>
          <div className="w-full overflow-x-auto shadow-lg p-5 rounded-xl">
            <table className="w-full text-sm min-w-[1200px]">
              <thead className="bg-gray-300/30 w-full rounded-lg text-left">
                <tr className="p-4 w-full flex items-center justify-between gap-5">
                  <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[50%]">
                    <span className="flex items-center gap-2">
                      Sənədlər <GoArrowDown />
                    </span>
                  </th>
                  <th className="text-sm font-medium w-[10%] text-gray-500">
                    İcraçı
                  </th>
                  <th className="text-sm font-medium w-[10%] text-gray-500">
                    Sənəd No
                  </th>
                  <th className="text-sm font-medium w-[10%] text-gray-500">
                    Deadline
                  </th>
                  <th className="text-sm font-medium w-[10%] text-gray-500 text-right">
                    Qurum
                  </th>
                  <th className="text-sm font-medium w-[10%] text-gray-500 rounded-e-lg">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="w-full flex flex-col gap-5 text-left mt-2">
                <div className="py-4 flex items-center justify-center w-full">
                  {isLoading && <Spinner />}
                </div>
                {isError || workflows.length === 0 ? (
                  <div className="p-5 text-center w-full">
                    Heç bir sənəd tapılmadı
                  </div>
                ) : (
                  workflows.map((workflow, index) => (
                    <Link
                      to={`/workflows/${workflow.id}`}
                      key={index}
                      className="p-4 bg-gray-300/30 rounded-lg w-full flex items-center justify-between gap-5 min-h-[76px]"
                    >
                      <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[50%]">
                        <span>{workflow.project?.name}</span>
                      </th>
                      <td className="text-sm font-medium text-gray-500 w-[10%]">
                        {workflow.sender.name}
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[10%]">
                        {workflow.document.document_no}
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[10%] flex flex-col gap-1">
                        <span className="text-xs">
                          {moment(workflow.updated_at).format("YYYY-MM-DD")}
                        </span>
                        <span className="text-xs">
                          {moment(workflow.updated_at).format("HH:mm")}
                        </span>
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[10%] text-right flex items-center justify-end">
                        <img
                          className="w-[30px] h-[40px] rounded-full"
                          src={workflow.government.image_url}
                          alt={workflow.government.name}
                        />
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[10%] rounded-e-lg">
                        {renderStatus(workflow.status)}
                      </td>
                    </Link>
                  ))
                )}
              </tbody>
              <Pagination meta={meta} onPageChange={handlePageChange} />
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflows;
