import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import useToast from "@/hooks/useToast";
import Breadcrumb from "@/components/App/Cost/Breadcrumb";
import NotFound from "./NotFound";
import { BsFillPrinterFill } from "react-icons/bs";
import Select from "@/components/common/Select";
import InvoiceDetailTable from "@/components/App/Cost/InvoiceDetailTable";
import { useGetInvoiceDetailQuery } from "@/data/services/costService";
import { useUpdateInvoiceMutation } from "@/data/services/costService";
import moment from "moment";
import { Toaster } from "react-hot-toast";
import ReactToPrint from "react-to-print";

const InvoiceDetail = () => {
  const { id } = useParams();
  const { data } = useGetInvoiceDetailQuery(id);
  const [updateInvoice, { isSuccess, isError }] = useUpdateInvoiceMutation();
  const { showToast } = useToast();

  const componentRef = useRef();

  const handleChangeStatus = (status) => {
    if (id) {
      updateInvoice({ id, status });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      showToast("Status uğurlu şəkildə dəyişdirildi", "success");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      showToast("Status dəyişdirilə bilmədi", "error");
    }
  }, [isError]);

  if (!data) {
    return <NotFound name="Invoice" />;
  }

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

  const renderStatus = (status) => {
    switch (status) {
      case "CANCELLED":
        return (
          <span className="text-xs font-bold py-1 px-2 rounded bg-red-600/20 text-red-600 capitalize w-full">
            {status}
          </span>
        );
      case "PAID":
        return (
          <span className="text-xs font-bold py-1 px-2 rounded bg-green-600/20 text-green-600 capitalize w-full">
            {status}
          </span>
        );
      case "PENDING":
        return (
          <span className="text-xs font-bold py-1 px-2 rounded bg-yellow-600/20 text-yellow-600 capitalize w-full">
            {status}
          </span>
        );
      default:
        return (
          <span className="text-xs font-bold py-1 px-2 rounded bg-gray-600/40 capitalize w-full">
            {status}
          </span>
        );
    }
  };

  return (
    <section>
      <div className="siteContainer">
        <Toaster />
        <div className="py-10">
          <h1 className="text-2xl font-semibold">{data.code}</h1>
          <Breadcrumb />
          <div className="flex items-center justify-between flex-wrap gap-4">
              <ReactToPrint
                trigger={() => (
                  <button className="text-xl text-gray-400 p-2 relative group">
                    <BsFillPrinterFill />
                    <span className="text-xs font-medium text-center bg-black/20 text-black p-1 rounded hidden group-hover:block absolute -bottom-5 left-0">
                      Print
                    </span>
                  </button>
                )}  content={() => componentRef.current}
              />
            <div className="w-[20%]">
              <Select
                onChange={handleChangeStatus}
                value={status}
                options={options}
                column
                absolute
                label="Status seç"
              />
            </div>
          </div>
          <div
            ref={componentRef}
            className="mt-10 bg-white rounded-lg shadow-lg md:p-10 p-5"
          >
            <div className="flex flex-col items-end gap-2 w-full">
              <span>{renderStatus(data.status)}</span>
              <span className="text-md font-semibold">{data.code}</span>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-10 mt-10">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Kimdən</h3>
                <div className="flex flex-col gap-1 text-sm">
                  <span>{data.from.name}</span>
                  <span>{data.from.address}</span>
                  <span>Tel: {data.from.phone}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Kimə</h3>
                <div className="flex flex-col gap-1 text-sm">
                  <span>{data.to.name}</span>
                  <span>{data.to.address}</span>
                  <span>Tel: {data.to.phone}</span>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 mt-10">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Yaradılma tarixi</h3>
                <div className="text-sm flex items-center gap-2">
                  <span>{moment(data.created_at).format("YYYY-MM-DD")}</span>-
                  <span>{moment(data.created_at).format("HH:ss")}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Yenilənmə tarixi</h3>
                <div className="text-sm flex items-center gap-2">
                  <span>{moment(data.updated_at).format("YYYY-MM-DD")}</span>-
                  <span>{moment(data.updated_at).format("HH:ss")}</span>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <InvoiceDetailTable items={data.items} data={data} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvoiceDetail;
