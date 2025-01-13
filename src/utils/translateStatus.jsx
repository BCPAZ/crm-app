export const translateStatus = (status) => {
  switch (status) {
    case 'PENDING':
      return <span className="text-sm font-medium py-2 px-4 rounded-lg bg-yellow-500/30 text-yellow-600">Gözlənilir</span>;
    case 'APPROVED':
      return <span className="text-sm font-medium py-2 px-4 rounded-lg bg-green-500/30 text-green-600">Qəbul edilib</span>;
    case 'REJECTED':
      return <span className="text-sm font-medium py-2 px-4 rounded-lg bg-red-500/30 text-red-600">İmtina edilib</span>;
    default:
      return 'Naməlum status';
  }
};
