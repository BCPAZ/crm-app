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
          {userInvoices.basket.map((prod, index) => (
            <tr
              key={index}
              className="p-5 border-b group-hover:bg-gray-200/20 border-grey/20  w-full flex items-center justify-between gap-5 min-h-[76px]"
            >
              <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[3%]">
                <span>{prod.id}</span>
              </th>
              <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[58%]">
                  <div className="flex flex-col">
                    <h3 className="text-sm text-secondary">{prod.service}</h3>
                    <span className="text-sm text-gray-400">
                      {prod.part}
                    </span>
                  </div>
              </th>
              <td className="text-sm font-medium text-gray-500 w-[13%]">
                <div className="flex flex-col">
                  <span className="text-xs text-secondary">
                    {prod.quantity}
                  </span>
                </div>
              </td>
              <td className="text-sm font-medium text-gray-500 w-[13%]">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">
                    {prod.unitPrice}
                  </span>
                </div>
              </td>
              <td className="text-sm font-medium text-gray-500 w-[13%]">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">
                    {prod.quantity * prod.unitPrice}
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
