import Selectbox from "@/components/common/Selectbox";
import { useParams } from "react-router-dom";
import userInvoices from "@/mocks/userInvoices";
import Breadcrumb from "@/components/App/Cost/Breadcrumb";
const InvoiceDetail = () => {
  const {id} = useParams();
  const data = userInvoices.find((invoice) => invoice.id === parseInt(id));
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
      </div>
    </sections>
  )
}

export default InvoiceDetail