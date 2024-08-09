import invoices from "@/mocks/invoices";
import CircleProgressBar from "./CircleProgressBar";

const InvoicePanel = () => {
  return (
    <div className="p-4 rounded-xl shadow-lg grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-content-center place-items-center gap-4">
      {invoices.map((invoice, index) => (
        <div key={index} className="flex items-center gap-3 border-grey/20 px-6 relative w-full">
          <CircleProgressBar progress={75} />
          <div className="flex flex-col gap-1">
            <h3 className="text-md font-medium">{invoice.type}</h3>
            <p className="text-sm text-gray-400">{invoice.invoiceCount} invoices</p>
            <span className="font-medium text-sm">${invoice.price}</span>
          </div>
          {index < invoices.length - 1 && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-full bg-gray-300 sm:block hidden"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InvoicePanel;

