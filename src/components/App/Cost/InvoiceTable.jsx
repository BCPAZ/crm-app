import Searchbar from "@/components/common/Searchbar";
import Select from "@/components/common/Select";
import { GoArrowDown } from "react-icons/go";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi2";
import {
  useGetInvoicesQuery,
  useDeleteInvoiceMutation,
} from "@/data/services/costService";
import { useState, useEffect } from "react";
import moment from "moment";
import Spinner from "@/components/common/Spinner";
import ReactPaginate from "react-paginate";
import useToast from "@/hooks/useToast";
import { Toaster } from "react-hot-toast";
import ConfirmationModal from "@/components/common/ConfirmationModal";

const InvoiceTable = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(null);
  const [search, setSearch] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const { data, isLoading, isError } = useGetInvoicesQuery({
    page,
    search,
    status,
  });
  const [deleteInvoice, { isSuccess: deleteSuccess, isError: deleteError, isLoading: deleteLoading }] =
    useDeleteInvoiceMutation();
  const invoices = data?.invoices || [];
  const meta = data?.meta || {};
  const { showToast } = useToast();

  const openConfirmation = (id) => {
    setSelectedInvoice(id);
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };
  const options = [
    {
      id: "PENDING",
      name: "Gözlənilir",
    },
    {
      id: "PAID",
      name: "Ödənilib",
    },
    {
      id: "CANCELLED",
      name: "Ləğv edilib",
    },
    {
      id: "OVERDUE",
      name: "Vaxtı keçmiş",
    },
    {
      id: "DRAFT",
      name: "Qaralama",
    },
  ];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSelectStatus = (value) => {
    setStatus(value);
    console.log(value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleDeleteInvoice = () => {
    if (selectedInvoice) {
      deleteInvoice(selectedInvoice);
      closeConfirmation();
    }
  };
  const renderStatus = (statusType) => {
    switch (statusType) {
      case "CANCELLED":
        return (
          <span className="text-xs py-1 px-2  rounded bg-red-600/20 text-red-600 capitalize w-full">
            Ləğv edilib
          </span>
        );
      case "PAID":
        return (
          <span className="text-xs py-1 px-2  rounded bg-green-600/20 text-green-600 capitalize w-full">
            Ödənilib
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
          <span className="text-xs py-1 px-2  rounded bg-blue-600/40 capitalize w-full">
            Naməlum
          </span>
        );
    }
  };

  useEffect(() => {
    if (deleteSuccess) {
      showToast("Faktura uğurlu şəkildə silindi", "success");
    }
  }, [deleteSuccess]);

  useEffect(() => {
    if (deleteError) {
      showToast("Faktura silinə bilmədi", "error");
    }
  }, [deleteError]);

  return (
    <div className="w-full rounded-lg shadow-xl">
      <ConfirmationModal
        handleDelete={handleDeleteInvoice}
        closeConfirmationModal={closeConfirmation}
        showConfirmation={showConfirmation}
        isLoading={deleteLoading}
        title="Siz bu fakturanı silmək istədiyinizdən əminsinizmi?"
      />
      <div className="text-sm font-medium text-gray-500 ">
        <Toaster />
        <div className="flex items-center justify-between flex-wrap gap-2 p-5">
          <div className="lg:w-[15%] sm:w-[48%] w-full">
            <Select
              value={status}
              options={options}
              onChange={handleSelectStatus}
              column
              absolute
              label="Status"
            />
          </div>
          <div className="flex-1">
            <Searchbar onChange={handleSearch} simple />
          </div>
        </div>

        <div className="flex flex-col w-full p-5">
          <h3>{invoices.length} nəticə tapıldı</h3>
        </div>
        <div className="w-full">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm min-w-[1200px]">
              <thead className="bg-gray-300/30 w-full rounded-lg text-left">
                <tr className="p-5 w-full flex items-center justify-between gap-5">
                  <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[30%]">
                    <span className="flex items-center gap-2">
                      Faktura <GoArrowDown />
                    </span>
                  </th>
                  <th className="text-sm font-medium w-[11%] text-gray-500">
                    Yaradılma tarixi
                  </th>
                  <th className="text-sm font-medium w-[11%] text-gray-500">
                    Yenilənmə tarixi
                  </th>
                  <th className="text-sm font-medium w-[11%] text-gray-500">
                    Kimdən
                  </th>
                  <th className="text-sm font-medium w-[11%] text-gray-500">
                    Kimə
                  </th>
                  <th className="text-sm font-medium w-[11%] text-gray-500 rounded-e-lg">
                    Ümumi qiymət
                  </th>
                  <th className="text-sm font-medium w-[11%] text-gray-500 rounded-e-lg">
                    Status
                  </th>
                  <th className="text-sm font-medium w-[5%] text-gray-500 rounded-e-lg"></th>
                </tr>
              </thead>
              <tbody className="w-full flex flex-col text-left">
                {isLoading && (
                  <div className="p-10 flex items-center justify-center w-full h-full">
                    <Spinner />
                  </div>
                )}
                {isError && (
                  <div className="p-10 flex items-center justify-center w-full h-full text-sm font-semibold">
                    Hər hansı bir faktura mövcud deyil
                  </div>
                )}
                {invoices.map((invoice, index) => (
                  <div className="group" to={`${invoice.id}`} key={index}>
                    <tr className="p-5 border-b group-hover:bg-gray-200/20 border-grey/20  w-full flex items-center justify-between gap-5 min-h-[76px]">
                      <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[30%]">
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col">
                            <Link
                              to={`/cost/${invoice.id}`}
                              className="text-sm hover:underline text-gray-400"
                            >
                              {invoice.code}
                            </Link>
                          </div>
                        </div>
                      </th>
                      <td className="text-sm font-medium text-gray-500 w-[11%]">
                        <div className="flex flex-col">
                          <h3 className="text-xs text-secondary">
                            {moment(invoice.created_at).format("YYYY-MM-DD")}
                          </h3>
                          <span className="text-xs text-gray-400">
                            {moment(invoice.created_at).format("HH:ss")}
                          </span>
                        </div>
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[11%]">
                        <div className="flex flex-col">
                          <h3 className="text-xs text-secondary">
                            {moment(invoice.updated_at).format("YYYY-MM-DD")}
                          </h3>
                          <span className="text-xs text-gray-400">
                            {moment(invoice.updated_at).format("HH:ss")}
                          </span>
                        </div>
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[11%]">
                        <span className="text-xs text-secondary">
                          {invoice.from.name}
                        </span>
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[11%]">
                        <span className="text-xs text-secondary">
                          {invoice.to.name}
                        </span>
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[11%]">
                        <span className="text-xs text-secondary">
                          ₼ {invoice.total}
                        </span>
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[11%]">
                        {renderStatus(invoice.status)}
                      </td>
                      <td className="text-sm font-medium text-gray-500 w-[5%] flex items-center justify-center">
                        <button
                          onClick={() => openConfirmation(invoice.id)}
                          className="outline-none border-none p-1 rounded-lg hover:text-red-600 hover:bg-red-600/30 transition-all duration-300"
                          type="button"
                        >
                          <HiTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  </div>
                ))}
              </tbody>
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
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
