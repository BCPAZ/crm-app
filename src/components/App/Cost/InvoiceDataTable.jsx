import CheckboxElement from "@/components/common/CheckboxElement";
import userInvoices from "@/mocks/userInvoices";
import { GoArrowDown } from "react-icons/go";
import { Link } from "react-router-dom";
import { LuMoreVertical } from "react-icons/lu";

const InvoiceDataTable = () => {
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
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm min-w-[1200px]">
        <thead className="bg-gray-300/30 w-full rounded-lg text-left">
          <tr className="p-5 w-full flex items-center justify-between gap-5">
            <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[40%]">
              <CheckboxElement />
              <span className="flex items-center gap-2">
                User <GoArrowDown />
              </span>
            </th>
            <th className="text-sm font-medium w-[11%] text-gray-500">
              Create
            </th>
            <th className="text-sm font-medium w-[11%] text-gray-500">Due</th>
            <th className="text-sm font-medium w-[11%] text-gray-500">
              Amount
            </th>
            <th className="text-sm font-medium w-[11%] text-gray-500">Sent</th>
            <th className="text-sm font-medium w-[11%] text-gray-500 rounded-e-lg">
              Status
            </th>
            <th className="text-sm font-medium w-[5%] text-gray-500 rounded-e-lg">
            </th>
          </tr>
        </thead>
        <tbody className="w-full flex flex-col text-left">
          {userInvoices.map((invoice, index) => (
            <Link className="group" to={`${invoice.id}`} key={index}>
              <tr className="p-5 border-b group-hover:bg-gray-200/20 border-grey/20  w-full flex items-center justify-between gap-5 min-h-[76px]">
                <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[40%]">
                  <CheckboxElement />
                  <div className="flex items-center gap-4">
                    <img
                      className="w-[40px] h-[40px] rounded-full"
                      src={invoice.avatar}
                      alt=""
                    />
                    <div className="flex flex-col">
                      <h3 className="text-sm text-secondary">{invoice.name}</h3>
                      <span className="text-sm text-gray-400">
                        {invoice.code}
                      </span>
                    </div>
                  </div>
                </th>
                <td className="text-sm font-medium text-gray-500 w-[11%]">
                  <div className="flex flex-col">
                    <h3 className="text-xs text-secondary">
                      {invoice.createDate}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {invoice.createTime}
                    </span>
                  </div>
                </td>
                <td className="text-sm font-medium text-gray-500 w-[11%]">
                  <div className="flex flex-col">
                    <h3 className="text-xs text-secondary">
                      {invoice.dueDate}
                    </h3>
                    <span className="text-xs text-gray-400">
                      {invoice.dueTime}
                    </span>
                  </div>
                </td>
                <td className="text-sm font-medium text-gray-500 w-[11%]">
                  <span className="text-sm text-secondary">
                    ${invoice.amount}
                  </span>
                </td>
                <td className="text-sm font-medium text-gray-500 w-[11%]">
                  <span className="text-sm text-secondary">
                    ${invoice.sent}
                  </span>
                </td>
                <td className="text-sm font-medium text-gray-500 w-[11%]">
                  {renderStatus(invoice.status)}
                </td>
                <td className="text-sm font-medium text-gray-500 w-[5%] flex items-center justify-center">
                  <button className="outline-none border-none" type="button"><LuMoreVertical size={18}/></button>
                </td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceDataTable;
