import Searchbar from "@/components/common/Searchbar";
import Select from "@/components/common/Select";
import InvoiceDataTable from "./InvoiceDataTable";

const InvoiceTable = () => {
  return (
    <div className="w-full rounded-lg shadow-xl">
      <div className="text-sm font-medium text-gray-500 ">
        <ul className="flex flex-wrap -mb-px px-5 border-b border-grey/20">
          <li className="me-2">
            <a
              href="#"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Profile
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              className="inline-block p-4 text-black border-b-2 border-black rounded-t-lg active"
              aria-current="page"
            >
              Dashboard
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Settings
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            >
              Contacts
            </a>
          </li>
        </ul>
        <div className="flex items-center gap-2 p-5">
          <Select column />
          <Select column />
          <Select column />
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
