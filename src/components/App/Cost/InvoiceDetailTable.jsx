import PropTypes from "prop-types";

const InvoiceDetailTable = ({ items, data }) => {
  const taxes = Number(data.taxes);

  const parsedItems = items.map(item => ({
    ...item,
    quantity: Number(item.quantity),
    unitPrice: Number(item.unit_price),
    total: Number(item.total)
  }));

  const subtotal = parsedItems.reduce((acc, prod) => acc + prod.total, 0);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm min-w-[1200px]">
        <thead className="bg-gray-300/30 w-full rounded-lg text-left">
          <tr className="p-5 w-full flex items-center justify-between gap-5">
            <th className="text-sm w-[3%] font-medium text-gray-500">#</th>
            <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[58%]">
              <span className="flex items-center gap-2">Ad</span>
            </th>
            <th className="text-sm font-medium w-[13%] text-gray-500">Say</th>
            <th className="text-sm font-medium w-[13%] text-gray-500">
              Vahid qiymət
            </th>
            <th className="text-sm font-medium w-[13%] text-gray-500">
              Ümumi dəyər
            </th>
          </tr>
        </thead>
        <tbody className="w-full flex flex-col text-left">
          {parsedItems.map((prod, index) => (
            <tr
              key={index}
              className="p-5 border-b group-hover:bg-gray-200/20 border-grey/20  w-full flex items-center justify-between gap-5 min-h-[76px]"
            >
              <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[3%]">
                <span>{index + 1}</span>
              </th>
              <th className="text-sm font-medium text-gray-500 flex items-center gap-3 rounded-s-lg w-[58%]">
                <div className="flex flex-col">
                  <h3 className="text-sm text-secondary">{prod.name}</h3>
                </div>
              </th>
              <td className="text-sm font-medium w-[13%]">
                <span className="text-sm text-black">{prod.quantity}</span>
              </td>
              <td className="text-sm font-medium w-[13%]">
                <span className="text-sm text-black">₼{prod.unitPrice.toFixed(2)}</span>
              </td>
              <td className="text-sm font-medium w-[13%]">
                <span className="text-sm text-black">₼{prod.total.toFixed(2)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col gap-3 md:items-end items-start p-5 border-b border-grey/20 border-dashed">
        <div className="flex flex-row items-center text-sm">
          <span className="text-gray-500 md:w-fit w-[100px]">Vergilər:</span>
          <span className="md:w-[162px] text-end font-base">₼{taxes.toFixed(2)}</span>
        </div>
        <div className="flex flex-row items-center text-md">
          <span className="text-black font-semibold md:w-fit w-[100px]">Ümumi:</span>
          <span className="md:w-[162px] text-end font-semibold">₼{(subtotal + taxes).toFixed(2)}</span>
        </div>
      </div>
      <div className="p-5 flex justify-between items-center flex-wrap gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold">NOTES</h3>
          <p className="text-sm">Bizimlə əlaqə saxlayın, əgər əlavə VAT və ya qeydlər əlavə etmək istəyirsinizsə!</p>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold">Sualınız var?</h3>
          <a href="mailto:support@crm.az" className="text-sm">support@crm.az</a>
        </div>
      </div>
    </div>
  );
};

InvoiceDetailTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      unit_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })
  ).isRequired,
  data : PropTypes.shape({
    taxes: PropTypes.number.isRequired
  })
};

export default InvoiceDetailTable;
