import { useParams } from "react-router-dom";
import Breadcrumb from "@/components/App/Cost/Breadcrumb";
import NotFound from "./NotFound";
import { invoiceIcons } from "@/utils/constants";
import Select from "@/components/common/Select";
import InvoiceDetailTable from "@/components/App/Cost/InvoiceDetailTable";
import { useGetInvoiceDetail } from "@/data/services/costService";
const InvoiceDetail = () => {
  const { id } = useParams();
  const {data} = useGetInvoiceDetail(id);
  
  if (!data) {
    return <NotFound name="Invoice" />;
  }

  const renderStatus = (status) => {
    switch (status) {
      case "denied":
        return (
          <span className="text-xs font-bold py-1 px-2  rounded bg-red-600/20 text-red-600 capitalize w-full">
            {status}
          </span>
        );
      case "paid":
        return (
          <span className="text-xs font-bold py-1 px-2  rounded bg-green-600/20 text-green-600 capitalize w-full">
            {status}
          </span>
        );
      case "pending":
        return (
          <span className="text-xs font-bold py-1 px-2 rounded bg-yellow-600/20 text-yellow-600 capitalize w-full">
            {status}
          </span>
        );
      default:
        return (
          <span className="text-xs font-bold py-1 px-2  rounded bg-gray-600/40 capitalize w-full">
            {status}
          </span>
        );
    }
  };
  return (
    <section>
      <div className="siteContainer">
        <div className="py-10">
          <h1 className="text-2xl font-semibold">{data.code}</h1>
          <Breadcrumb />
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              {invoiceIcons.map((invIcon, index) => (
                <button
                  key={index}
                  className="text-xl text-gray-400 p-2 relative group"
                >
                  {invIcon.icon}
                  <span className="text-xs font-medium text-center bg-black/20 text-black p-1 rounded hidden group-hover:block absolute -bottom-5 left-0">
                    {invIcon.label}
                  </span>
                </button>
              ))}
            </div>
            <div className="w-fit">
              <Select />
            </div>
          </div>
          <div className="mt-10 bg-white rounded-lg shadow-lg md:p-10 p-5">
            <div className="flex flex-col items-end gap-2 w-full">
              <span>{renderStatus(data.status)}</span>
              <span className="text-md font-semibold">{data.code}</span>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-10 mt-10">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Invoice from</h3>
                <div className="flex flex-col gap-1 text-sm">
                  <span>{data.name}</span>
                  <span>{data.address}</span>
                  <span>Phone: {data.phone}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Invoice to</h3>
                <div className="flex flex-col gap-1 text-sm">
                  <span>{data.customer}</span>
                  <span>{data.customerAddress}</span>
                  <span>Phone: {data.customerPhoneCode}</span>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 mt-10">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Date create</h3>
                <div className="text-sm">
                  <span>{data.createDate}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">Due create</h3>
                <div className="text-sm">
                  <span>{data.dueDate}</span>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <InvoiceDetailTable data={data} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvoiceDetail;
