import Searchbar from "@/components/common/Searchbar";
import Select from "@/components/common/Select";
import InvoiceDataTable from "./InvoiceDataTable";
import Tabs from "@/components/common/Tabs";

const InvoiceTable = () => {
  return (
    <div className="w-full rounded-lg shadow-xl">
      <div className="text-sm font-medium text-gray-500 ">
        <Tabs />
        <div className="flex items-center justify-between flex-wrap gap-2 p-5">
          <div className="lg:w-[15%] sm:w-[48%] w-full">
            <Select column />
          </div>
          <div className="lg:w-[15%] sm:w-[50%] w-full ">
            <Select column />
          </div>
          <div className="lg:w-[15%] sm:w-[48%] w-full">
            <Select column />
          </div>
          <div className="flex-1">
            <Searchbar simple />
          </div>
        </div>

        <div className="flex flex-col w-full p-5">
          <h3>8 results found</h3>
        </div>
        <div className="w-full">
          <InvoiceDataTable />
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
