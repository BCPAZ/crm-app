import InvoicePanel from "@/components/App/Cost/InvoicePanel";
import InvoiceTable from "@/components/App/Cost/InvoiceTable";
import Selectbox from "@/components/common/Selectbox";
import { IoAddSharp } from "react-icons/io5";

const Cost = () => {
  return (
    <section>
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
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold">List</h4>
            <button
              className="flex items-center gap-2 bg-black text-white py-1.5 px-3 rounded-lg text-sm font-semibold"
              type="button"
            >
              <IoAddSharp size={22} />
              New Invoice
            </button>
          </div>
          <div className="mt-5">
            <InvoicePanel />
          </div>
          <div className="mt-5">
            <InvoiceTable />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cost;
