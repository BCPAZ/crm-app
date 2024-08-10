import Selectbox from "@/components/common/Selectbox";
import { useParams } from "react-router-dom";
import userInvoices from "@/mocks/userInvoices";
import Breadcrumb from "@/components/App/Cost/Breadcrumb";
import NotFound from "./NotFound";
import { invoiceIcons } from "@/utils/constants";
import Select from "@/components/common/Select";
const InvoiceDetail = () => {
  const { id } = useParams();
  const data = userInvoices.find((invoice) => invoice.id === parseInt(id));

  if (!data) {
    return <NotFound name="Invoice" />;
  }

  const renderStatus = (status) => {
    switch(status) {
      case 'denied':
        return <span className="text-xs py-1 px-2  rounded bg-red-600/20 text-red-600 capitalize w-full">{status}</span>;
      case 'paid':
        return <span className="text-xs py-1 px-2  rounded bg-green-600/20 text-green-600 capitalize w-full">{status}</span>;
      case 'pending':
        return <span className="text-xs py-1 px-2 rounded bg-yellow-600/20 text-yellow-600 capitalize w-full">{status}</span>;
      default:
        return <span className="text-xs py-1 px-2  rounded bg-gray-600/40 capitalize w-full">{status}</span>;
    }
  }
  return (
    <sections>
      <div className="border-b border-gray-400 py-7">
        <div className="siteContainer">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold w-full">Cost</h1>
            <div className="w-[15%]">
              <Selectbox />
            </div>
          </div>
        </div>
      </div>
      <div className="siteContainer">
        <div className="py-10">
          <h1 className="text-2xl font-semibold">{data.code}</h1>
          <Breadcrumb />
        </div>
        <div className="flex items-center justify-between">
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
        <div className="mt-10 bg-white rounded-lg shadow-lg p-10">
            <div className="flex flex-col items-end gap-2 w-full">
              <span>{renderStatus(data.status)}</span>
              <span className="text-md font-semibold">{data.code}</span>
            </div>
            <div className="grid grid-cols-2 mt-10">
              <div>
                <h3 className="text-sm font-semibold">Invoice from</h3>
              </div>
            </div>
        </div>
      </div>
    </sections>
  );
};

export default InvoiceDetail;
