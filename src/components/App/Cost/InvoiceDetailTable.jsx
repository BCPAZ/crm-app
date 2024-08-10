import PropTypes from "prop-types";

const InvoiceDetailTable = ({ data }) => {
  const subtotal = data.basket.reduce((acc, prod) => acc + (prod.quantity * prod.unitPrice), 0);

  const shipping = 10.00;
  const discount = 15.00;
  const taxes = 17.98;

  const total = subtotal + shipping + discount + taxes;

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
          {data.basket.map((prod, index) => (
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
                  <span className="text-sm text-gray-400">{prod.part}</span>
                </div>
              </th>
              <td className="text-sm font-medium w-[13%]">
                <span className="text-sm text-black">{prod.quantity}</span>
              </td>
              <td className="text-sm font-medium w-[13%]">
                <span className="text-sm text-black">${prod.unitPrice}</span>
              </td>
              <td className="text-sm font-medium w-[13%]">
                <span className="text-sm text-black">
                  ${prod.quantity * prod.unitPrice}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col gap-3 md:items-end items-start p-5 border-b border-grey/20 border-dashed">
        <div className="flex flex-row items-center text-sm">
          <span className="text-gray-500 md:w-fit w-[100px]">Subtotal:</span>
          <span className="md:w-[162px] text-end font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex flex-row items-center text-sm">
          <span className="text-gray-500 md:w-fit w-[100px]">Shipping:</span>
          <span className="md:w-[162px] text-end font-base text-red-600">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex flex-row items-center text-sm">
          <span className="text-gray-500 md:w-fit w-[100px]">Discount:</span>
          <span className="md:w-[162px] text-end font-base text-red-600">${discount.toFixed(2)}</span>
        </div>
        <div className="flex flex-row items-center text-sm">
          <span className="text-gray-500 md:w-fit w-[100px]">Taxes:</span>
          <span className="md:w-[162px] text-end font-base">${taxes.toFixed(2)}</span>
        </div>
        <div className="flex flex-row items-center text-md">
          <span className="text-black font-semibold md:w-fit w-[100px]">Total:</span>
          <span className="md:w-[162px] text-end font-semibold">${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="p-5 flex justify-between items-center flex-wrap gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold">NOTES</h3>
            <p className="text-sm">We appreciate your business. Should you need us to add VAT or extra notes let us know!</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold">Have a question?</h3>
            <a href="mailto:support@crm.az" className="text-sm">support@crm.az</a>
          </div>
      </div>
    </div>
  );
};

InvoiceDetailTable.propTypes = {
  data: PropTypes.shape({
    basket: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        service: PropTypes.string.isRequired,
        part: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        unitPrice: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired
};

export default InvoiceDetailTable;
