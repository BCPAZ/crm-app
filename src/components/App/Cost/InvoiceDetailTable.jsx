import userInvoices from "@/mocks/userInvoices";
const InvoiceDetailTable = () => {

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm min-w-[1200px]">
        <thead className="bg-gray-300/30 w-full rounded-lg text-left">
          <tr className="p-5 w-full flex items-center justify-between gap-5">
            <th className="text-sm w-[3%] font-medium text-gray-500">#</th>
            <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[58%]">
              <span className="flex items-center gap-2">Description</span>
            </th>
            <th className="text-sm font-medium w-[13%] text-gray-500">Qty</th>
            <th className="text-sm font-medium w-[13%] text-gray-500">
              Unit Price
            </th>
            <th className="text-sm font-medium w-[13%] text-gray-500">
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody className="w-full flex flex-col text-left">
          {userInvoices.map((invoice, index) => (
            <tr
              key={index}
              className="p-5 border-b group-hover:bg-gray-200/20 border-grey/20  w-full flex items-center justify-between gap-5 min-h-[76px]"
            >
              <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[3%]">
                <span>{invoice.id}</span>
              </th>
              <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[58%]">
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
              <td className="text-sm font-medium text-gray-500 w-[13%]">
                <div className="flex flex-col">
                  <h3 className="text-xs text-secondary">
                    {invoice.createDate}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {invoice.createTime}
                  </span>
                </div>
              </td>
              <td className="text-sm font-medium text-gray-500 w-[13%]">
                <div className="flex flex-col">
                  <h3 className="text-xs text-secondary">
                    {invoice.createDate}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {invoice.createTime}
                  </span>
                </div>
              </td>
              <td className="text-sm font-medium text-gray-500 w-[13%]">
                <div className="flex flex-col">
                  <h3 className="text-xs text-secondary">
                    {invoice.createDate}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {invoice.createTime}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceDetailTable;
