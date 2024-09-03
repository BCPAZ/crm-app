import CircleProgressBar from "./CircleProgressBar";
import { useGetDashboardQuery } from "@/data/services/costService";

const InvoicePanel = () => {
  const { data, isLoading, isError } = useGetDashboardQuery();

  if (isLoading) return <p>Yüklənir...</p>;
  if (isError) return <p>Bir xəta baş verdi.</p>;

  const totalCount = data.TOTAL.count;

  const calculateProgress = (count) => {
    return totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
  };

  return (
    <div className="p-4 rounded-xl shadow-lg grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-content-center place-items-center gap-4">
      <div className="flex items-center gap-3 border-grey/20 px-6 relative w-full">
        <CircleProgressBar progress={calculateProgress(data.PENDING.count)} />
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">Gözləyən</h3>
          <p className="text-xs text-gray-400">{data.PENDING.count} faktura</p>
          <span className="font-medium text-sm">₼{data.PENDING.total}</span>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-full bg-gray-300 sm:block hidden"></div>
      </div>

      <div className="flex items-center gap-3 border-grey/20 px-6 relative w-full">
        <CircleProgressBar progress={calculateProgress(data.PAID.count)} />
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">Ödənilənlər</h3>
          <p className="text-xs text-gray-400">{data.PAID.count} faktura</p>
          <span className="font-medium text-sm">₼{data.PAID.total}</span>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-full bg-gray-300 sm:block hidden"></div>
      </div>

      <div className="flex items-center gap-3 border-grey/20 px-6 relative w-full">
        <CircleProgressBar progress={calculateProgress(data.CANCELLED.count)} />
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">Ləğv edilən</h3>
          <p className="text-xs text-gray-400">{data.CANCELLED.count} faktura</p>
          <span className="font-medium text-sm">₼{data.CANCELLED.total}</span>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-full bg-gray-300 sm:block hidden"></div>
      </div>

      <div className="flex items-center gap-3 border-grey/20 px-6 relative w-full">
        <CircleProgressBar progress={calculateProgress(data.OVERDUE.count)} />
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">Vaxtı keçmiş</h3>
          <p className="text-xs text-gray-400">{data.OVERDUE.count} faktura</p>
          <span className="font-medium text-sm">₼{data.OVERDUE.total}</span>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-full bg-gray-300 sm:block hidden"></div>
      </div>

      <div className="flex items-center gap-3 border-grey/20 px-6 relative w-full">
        <CircleProgressBar progress={calculateProgress(data.DRAFT.count)} />
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium">Qaralama</h3>
          <p className="text-xs text-gray-400">{data.DRAFT.count} faktura</p>
          <span className="font-medium text-sm">₼{data.DRAFT.total}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoicePanel;
