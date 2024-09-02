import InvoicePanel from "@/components/App/Cost/InvoicePanel";
import InvoiceTable from "@/components/App/Cost/InvoiceTable";
import { IoAddSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Cost = () => {
  return (
    <section>
      <div className="siteContainer">
        <div className="py-10">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold">List</h4>
            <Link to='/cost/create-new-invoice'
              className="flex items-center gap-2 bg-black text-white py-1.5 px-3 rounded-lg text-sm font-semibold"
              type="button"
            >
              <IoAddSharp size={22} />
              New Invoice
            </Link>
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
