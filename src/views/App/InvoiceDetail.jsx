import Selectbox from "@/components/common/Selectbox";
import { useParams } from "react-router-dom";
import userInvoices from "@/mocks/userInvoices";
import Breadcrumb from "@/components/App/Cost/Breadcrumb";
import NotFound from "./NotFound";
import { invoiceIcons } from "@/utils/constants";
const InvoiceDetail = () => {
  const { id } = useParams();
  const data = userInvoices.find((invoice) => invoice.id === parseInt(id));

  if (!data) {
    return <NotFound name="Invoice" />;
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
        <div>
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
        </div>
      </div>
    </sections>
  );
};

export default InvoiceDetail;
