const WorkflowReport = () => {
  return (
    <div className="md:p-6 p-3 bg-white shadow-lg rounded-lg">
      <h6 className="w-full font-medium text-lg">Workflows</h6>
      <div className="flex flex-col gap-2 mt-6">
        <div className="flex items-center justify-between">
          <h6 className="text-sm font-medium">Completed</h6>
          <div className="text-sm font-medium">5 <span className="text-sm text-gray-400">(Total:20)</span></div>
        </div>
        <div className="bg-grey/20 relative w-full h-2 rounded-lg">
          <div className="absolute bg-[#00A76F] w-1/4 h-full rounded-lg transition-all duration-300"></div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <div className="flex items-center justify-between">
          <h6 className="text-sm font-medium">In progress</h6>
          <div className="text-sm font-medium">8 <span className="text-sm text-gray-400">(Total:12)</span></div>
        </div>
        <div className="bg-grey/20 relative w-full h-2 rounded-lg">
          <div className="absolute bg-[#00B8D9] w-3/4 h-full rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowReport;
